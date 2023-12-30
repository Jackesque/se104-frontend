<script>
  import Header from '$lib/components/Header.svelte';
  import BlueBtn from '$lib/components/BlueBtn.svelte';
  import AuthenBtn from '$lib/components/AuthenBtn.svelte';
  import TableHead from '$lib/components/TableHead.svelte';
  import TableProduct from '$lib/components/TableProduct.svelte';
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import { browser } from "$app/environment";
  import axios from "$lib/utils/axios.customize.js";
  
  
  let userId, shopId;
  const userInfo = writable();
  const shopInfo = writable();
  const productsInfo = writable();
  
  const logoutUser = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("shopId");
    alert('Đăng xuất thành công!');
    location.href = './login';
  }
  const gotoSelected = (node) => {
    node.addEventListener("change", () => {
      if(node.value) location.href = `./${node.value}`;
    });
  }
    const filterProduct = async () => {
    const res = await axios.get(`/api/v1/product?name=${filter_product.value}`);
    productsInfo.set(res.data);
  }
  
  onMount(async () => {
    userId = JSON.parse(localStorage.getItem("userId"));
    shopId = JSON.parse(localStorage.getItem("shopId"));
    if (userId === null) {
      location.href = './login';
    }
    const userRes = await axios.get(`/api/v1/user/${userId}`);
    userInfo.set(userRes.data);
    console.log($userInfo);
    if (!$userInfo) {
      localStorage.removeItem("userId");
      location.href = './login';
    }
    
    const shopRes = await axios.get(`/api/v1/shop/${shopId}`);
    shopInfo.set(shopRes.data);
    const productsRes = await axios.get(`/api/v1/product`);
    productsInfo.set(productsRes.data);
    console.log($productsInfo);
  });
</script>
<head>
  <title>Trang chủ</title>
</head>

{#if $userInfo && $productsInfo}
<Header title="Trang chủ" />
<div class="bg-white py-4">
  <div class=" w-full flex flex-col">
    <div class="flex justify-between px-12 py-2">
      <div class="flex gap-12">
        {#if $shopInfo}
        <select name="shop_dropdown" id="shop_dropdown" class="bluebtn cursor-pointer" use:gotoSelected>
          <option selected disabled hidden>Thông tin shop</option>
          <option value="edit_shop_info" class="text-black bg-white">Sửa thông tin</option>
          <option value="products_storage" class="text-black bg-white">Danh sách sản phẩm</option>
        </select>
        {:else}
        <a href="./open_shop" class="bluebtn">Mở shop</a>
        {/if}
      </div>
      <div class="flex gap-12 items-center">
        <select name="user_dropdown" id="user_dropdown" class="authenbtn cursor-pointer" use:gotoSelected>
          <option selected disabled hidden>Thông tin người dùng</option>
          <option value="edit_user_info" class="text-black bg-white">Sửa thông tin</option>
          <option value="checkout" class="text-black bg-white">Đơn hàng</option>
          <option value="checkout_lookup" class="text-black bg-white">Tra cứu đơn hàng</option>
        </select>
        <button class="authenbtn" on:click={logoutUser}>Đăng xuất</button>
      </div>
    </div>
    <div class=" w-full h-48 flex items-center">
      <div class="w-[60%]">
        <fieldset class="text-lg rounded border-2 border-solid border-[#c5c5c5] px-4 pt-1 pb-3 w-[60%] mx-5 my-8">
          <legend class=" text-tprim">Tìm sản phẩm</legend>
          <input class=" p-0 w-full text-lg border-none outline-none focus:ring-0" type="text" name="filter_product" id="filter_product" placeholder="Nhập tên sản phẩm" on:input={filterProduct} />
        </fieldset>
      </div>
      <div class="w-[40%] flex flex-col gap-4 text-center">
        <div class=" text-3xl">Xin chào {$userInfo.name}</div>
        
        <div class=" text-5xl/normal font-bold">UIT-COM</div>
      </div>
    </div>
  </div>
  <div class="p-4">
    <div class="flex justify-start items-start gap-4">
      {#each $productsInfo as {id, name, image, price} (id) }
        <a href="./products/{id}" class=" card block min-h-[20rem] w-48 border border-slate-300 rounded ease-in-out duration-300 hover:shadow-xl hover:border-black">
          <div class=" w-full h-full flex flex-col justify-between items-center gap-4">
            <div></div>
            <img src={image} alt="product_image" class=" max-h-48 select-none pointer-events-none" />
            <div class=" separator w-full pb-4 border-t border-slate-300 ease-in-out duration-300 text-center">
              <div class=" text-xl/normal">{name}</div>
              <div>{price}đ</div>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>
{/if}

<style>
  .card:hover .separator {
    border-color: black;
  }
</style>