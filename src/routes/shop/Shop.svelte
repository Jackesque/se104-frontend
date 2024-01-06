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
  
  
  let userId, shopId, typeId, factoryId;
  const fromPrice = writable(0);
  const toPrice = writable(1000000);
  const userInfo = writable();
  const shopInfo = writable();
  const productsInfo = writable();
  const factoryInfo = writable();
  const typeInfo = writable();
  
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
  const filterProduct = async (condition) => {
    let filteredData;
    if (condition === "name") {
      const res = await axios.get(`/api/v1/product?name=${filter_product.value}`);
      filteredData = res.data;
    }
    if (condition === "price") {
      console.log($toPrice);
      const res = await axios.post(`/api/v1/product/all?price=${$toPrice}`, {shopId});
      filteredData = res.data;
    }
    if (condition === "type") {
      const res = await axios.post(`/api/v1/product/all?typeId=${typeId}`, {shopId});
      filteredData = res.data;
    }
    if (condition === "factory") {
      const res = await axios.post(`/api/v1/product/all?factoryId=${factoryId}`, {shopId});
      filteredData = res.data;
    }
    if (condition === "default") {
      const res = await axios.post(`/api/v1/product/all`, {shopId});
      filteredData = res.data;
    }
    console.log("filterproductres", condition, filteredData);
    productsInfo.set(filteredData);
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
    const productsRes = await axios.post(`/api/v1/product/all`, {shopId});
    productsInfo.set(productsRes.data);
    console.log($productsInfo);
    
    const typeRes = await axios.get("/api/v1/type-product");
    typeInfo.set(typeRes.data);
    const factoryRes = await axios.get("/api/v1/factory");
    factoryInfo.set(factoryRes.data);
  });
</script>
<head>
  <title>Trang chủ shop</title>
</head>

{#if $shopInfo && $productsInfo}
<Header title="Trang chủ shop" />
<div class="bg-white py-4">
  <div class=" w-full flex flex-col">
    <div class="flex justify-between px-12 py-2">
      <div class="flex gap-12">
        {#if $shopInfo}
        <a href="./edit_shop_info" class="bluebtn">Thông tin shop</a>
        <a href="./products_storage" class="bluebtn">Danh sách sản phẩm</a>
        <a href="./shop/checkout_lookup" class="bluebtn">Tra cứu đơn hàng</a>
        <a href="./shop/income" class="bluebtn">Xem doanh thu</a>
        {/if}
      </div>
      <div class="flex gap-12 items-center">
        <a href="../" class="authenbtn">Về trang chủ</a>
        <button class="authenbtn" on:click={logoutUser}>Đăng xuất</button>
      </div>
    </div>
    <div class=" h-48 flex justify-between items-center">
      <fieldset class="text-lg rounded border-2 border-solid border-[#c5c5c5] px-4 pt-1 pb-3 w-[30%] mx-5 my-8">
        <legend class=" text-tprim">Tìm sản phẩm</legend>
        <input class=" w-full p-0 text-lg border-none outline-none focus:ring-0" type="text" name="filter_product" id="filter_product" placeholder="Nhập tên sản phẩm" on:input={() => filterProduct("name")} />
      </fieldset>
      <div class="flex flex-col gap-2">
        <div>
          <span class=" font-bold after:content-[':']">Lọc theo giá</span>
          từ <input type="number" min="0" max={$toPrice} step="1000" class="w-36 text-right px-0" bind:value={$fromPrice}>đ đến <input type="number" min={$fromPrice} step="1000" class="w-36 text-right px-0" bind:value={$toPrice}>đ
          <button class="px-2 bg-slate-300 rounded" on:click={() => filterProduct("price")}>Lọc</button>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex flex-1 justify-between items-center gap-1">
            <label for="product_type" class=" font-bold after:content-[':']">Lọc theo thể loại</label>
            {#if $typeInfo}
            <select name="product_type" id="product_type" bind:value={typeId}>
              {#each $typeInfo as {id, name} (id) }
              <option value={id}>{name}</option>
              {/each}
            </select>
            {/if}
          </div>
          <button class="px-2 bg-slate-300 rounded" on:click={() => filterProduct("type")}>Lọc</button>
        </div>
        <!-- <div class="flex justify-between items-center gap-1">
          <label for="product_factory" class=" font-bold after:content-[':']">Lọc theo nhà sản xuất</label>
          {#if $factoryInfo}
          <select name="product_factory" id="product_factory" bind:value={factoryId}>
            {#each $factoryInfo as {id, name} (id) }
            <option value={id}>{name}</option>
            {/each}
          </select>
          <button class="px-2 bg-slate-300 rounded" on:click={() => filterProduct("factory")}>Lọc</button>
          {/if}
        </div> -->
      </div>
      <div>
        <button class="px-2 bg-slate-300 rounded" on:click={() => filterProduct("default")}>Hủy lọc</button>
      </div>
      <div class="w-[30%] flex flex-col gap-4 text-center">
        <div class=" text-3xl">Xin chào {$userInfo.name}</div>
        
        <div class=" text-5xl/normal font-bold">{$shopInfo.name}</div>
      </div>
    </div>
  </div>
  <div class="p-4">
    <div class="flex flex-wrap justify-start items-start gap-4">
      {#each $productsInfo as {id, name, image, price} (id) }
      <a href="./shop/product/{id}" class=" card block min-h-[20rem] w-48 border border-slate-300 rounded ease-in-out duration-300 hover:shadow-xl hover:border-black">
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