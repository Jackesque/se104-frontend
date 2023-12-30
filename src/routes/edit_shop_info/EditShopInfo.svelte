<script>
  import Header from "$lib/components/Header.svelte";
  import BlueBtn from "$lib/components/BlueBtn.svelte";
  import BackBtn from "$lib/components/BackBtn.svelte";
  import axios from "$lib/utils/axios.customize.js";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  
  let shopId;
  const shopInfo = writable();
  
  const editshopInfo = async () => {
    const name = shopname.value;
    const phoneNumber = shop_tel.value;
    const address = products_address.value;
    const res = await axios.put(`/api/v1/shop/${shopId}`, {name, phoneNumber, address});
    if(res.statusCode >= 200 && res.statusCode < 300) {
      alert('Sửa thông tin thành công!');
      location.href = "../";
    } else {
      alert(res.message);
    }
  }
  
  onMount(async () => {
    shopId = JSON.parse(localStorage.getItem("shopId"));
    const res = await axios.get(`/api/v1/shop/${shopId}`);
    shopInfo.set(res.data);
    console.log($shopInfo);
  });
</script>

<head>
  <title>Sửa thông tin shop</title>
</head>

{#if $shopInfo}
<div class=" items-center">
  <div class="">
    <Header title="Sửa thông tin shop" />
  </div>
  <div class=" bg-white flex flex-col gap-4 p-14 pt-8">
    <BackBtn />
    <div class="text-4xl/normal font-bold border-b-2 border-tprim">Thông tin shop</div>
    <form class="flex flex-col gap-8 px-12">
      <div class="flex flex-col gap-4">
        <div>
          <label for="shopname">Tên cửa hàng</label>
          <input
          type="text"
          id="shopname"
          class="input-line"
          bind:value={$shopInfo.name}
          autocomplete="name"
          required
          />
        </div>
        <div>
          <label for="shop_tel">SĐT cửa hàng</label>
          <input
          type="tel"
          pattern="^(\d{'{'}10}|\d{'{'}11})$" 
          title="Số điện thoại phải bao gồm 10 hoặc 11 chữ số"
          id="shop_tel"
          class="input-line"
          bind:value={$shopInfo.phoneNumber}
          autocomplete="tel"
          required
          />
        </div>
        <div>
          <label for="products_address">Địa chỉ lấy hàng</label>
          <input
          type="text"
          id="products_address"
          class="input-line"
          bind:value={$shopInfo.address}
          autocomplete="address-level4"
          required
          />
        </div>
        <div class="self-end">
          <BlueBtn href="" title="Lưu" class="uppercase" on:click={editshopInfo}/>
        </div>
      </div>
    </form>
  </div>
</div>
{/if}

