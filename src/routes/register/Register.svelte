<script>
  import Header from "$lib/components/Header.svelte";
  import BlueBtn from "$lib/components/BlueBtn.svelte";
  import axios from "$lib/utils/axios.customize.js";
  
  const registerUser = async () => {
    const email = user_email.value;
    const password = user_password.value;
    const name = username.value;
    const phoneNumber = user_tel.value;
    const birth = [user_birthdate.value, "T00:00:00Z"].join('');
    const address = shipping_address.value;
    const res = await axios.post("/api/v1/auth/register", {email, password, name, phoneNumber, birth, address});
    if(res.statusCode >= 200 && res.statusCode < 300) {
      localStorage.setItem("userId", JSON.stringify(res.data.id));
      localStorage.setItem("cart", JSON.stringify([]));
      alert('Đăng ký thành công!');
      location.href = "../";
    } else {
      alert(res.message);
    }
  }
</script>

<head>
  <title>Đăng ký</title>
</head>

<div class=" grid justify-center items-center">
  <div class="">
    <Header title="Đăng ký" />
  </div>
  <div class=" bg-white flex flex-col gap-4 p-14 pt-8">
    <div>
      <!-- <BackBtn /> -->
    </div>
    <div>
      <div class=" uppercase text-5xl/normal font-bold">Chào mừng bạn đến với UIT-COM !</div>
      Đã có tài khoản?
      <button class=" text-tprim font-bold hover:bg-bgprim" on:click={() => location.replace("../login")}>Đăng nhập</button>
    </div>
    <form class="flex flex-col gap-8 px-12">
      <div class="flex flex-col gap-4">
        <div>
          <label for="username">Tên người dùng</label>
          <input
          type="text"
          id="username"
          class="input-line"
          placeholder="User1"
          autocomplete="name"
          required
          />
        </div>
        <div>
          <label for="user_email">Địa chỉ email</label>
          <input
          type="email"
          id="user_email"
          class="input-line"
          placeholder="your.email@domain.com"
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
          placeholder="Pa$sw0rd"
          autocomplete="new-password"
          required
          />
        </div>
        <!-- <div>
          
          <label for="reenter_user_password">Xác nhận mật khẩu</label>
          <input
          type="password"
          id="reenter_user_password"
          class="input-line"
          placeholder="Pa$sw0rd"
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
          placeholder="0987654321"
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
          placeholder="Số 6 đường D1, Khu Công Nghiệp Tân Bình, phường Tây Thạnh, quận Tân Phú, TP. Hồ Chí Minh"
          autocomplete="address-level4"
          required
          />
        </div>
      </div>
      <div class=" self-center">
        <BlueBtn href="" title="Đăng ký" class="uppercase" on:click={registerUser}/>
      </div>
    </form>
  </div>
</div>
