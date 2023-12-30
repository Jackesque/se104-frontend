<script>
  import Header from "$lib/components/Header.svelte";
  import BlueBtn from "$lib/components/BlueBtn.svelte";
  import BackBtn from "$lib/components/BackBtn.svelte";
  import axios from "$lib/utils/axios.customize.js";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  
  let userId, birthdateValue, role;
  const userInfo = writable();
  // const isLoaded = typeof localStorage !== 'undefined';
  // if (typeof localStorage !== 'undefined') {
  //   userInfo = JSON.parse(localStorage.getItem("user"));
  //   userId = userInfo.id;
  //   birthdateValue = userInfo.birth.slice(0, 10);
  // }
  
  const editUserInfo = async () => {
    const name = username.value;
    const phoneNumber = user_tel.value;
    const birth = [user_birthdate.value, "T00:00:00Z"].join('');
    const address = shipping_address.value;
    const res = await axios.put(`/api/v1/user/${userId}`, {name, phoneNumber, birth, address, role});
    if(res.statusCode >= 200 && res.statusCode < 300) {
      alert('Sửa thông tin thành công!');
      location.href = "../";
    } else {
      alert(res.message);
    }
  }
  
  onMount(async () => {
    userId = JSON.parse(localStorage.getItem("userId"));
    const res = await axios.get(`/api/v1/user/${userId}`);
    userInfo.set(res.data);
    birthdateValue = $userInfo.birth.slice(0, 10);
    role = $userInfo.role;
    console.log($userInfo);
  });
</script>

<head>
  <title>Sửa thông tin người dùng</title>
</head>

{#if $userInfo}
<div class=" items-center">
  <div class="">
    <Header title="Sửa thông tin người dùng" />
  </div>
  <div class=" bg-white flex flex-col gap-4 p-14 pt-8">
    <BackBtn />
    <div class="text-4xl/normal font-bold border-b-2 border-tprim">Thông tin người dùng</div>
    <form class="flex flex-col gap-8 px-12">
      <div class="flex flex-col gap-4">
        <div>
          <label for="username">Tên người dùng</label>
          <input
          type="text"
          id="username"
          class="input-line"
          bind:value={$userInfo.name}
          autocomplete="name"
          required
          />
        </div>
        <!-- <div>
          <label for="user_email">Địa chỉ email</label>
          <input
          type="email"
          id="user_email"
          class="input-line"
          bind:value={$userInfo.email}
          autocomplete="email"
          required
          />
        </div>
        <div>
          
          <label for="user_password">Mật khẩu</label>
          <input
          type="password"
          id="user_password"
          class="input-line"
          bind:value={$userInfo.password}
          autocomplete="new-password"
          required
          />
        </div> -->
        <div>
          
          <label for="user_birthdate">Ngày sinh</label>
          <input
          type="date"
          id="user_birthdate"
          class="input-line select-none"
          autocomplete="bday"
          onmousedown="return false;"
          onkeydown="return false;"
          onclick="this.showPicker();"
          bind:value={birthdateValue}
          required
          />
        </div>
        <div>
          <label for="user_tel">Số điện thoại</label>
          <input
          type="tel"
          pattern="^(\d{'{'}10}|\d{'{'}11})$" 
          title="Số điện thoại phải bao gồm 10 hoặc 11 chữ số"
          id="user_tel"
          class="input-line"
          bind:value={$userInfo.phoneNumber}
          autocomplete="tel"
          required
          />
        </div>
        <div>
          <label for="shipping_address">Địa chỉ giao hàng</label>
          <input
          type="text"
          id="shipping_address"
          class="input-line"
          bind:value={$userInfo.address}
          autocomplete="address-level4"
          required
          />
        </div>
      </div>
      <div class="self-end">
        <BlueBtn href="" title="Lưu" class="uppercase" on:click={editUserInfo}/>
      </div>
    </form>
  </div>
</div>
{/if}

