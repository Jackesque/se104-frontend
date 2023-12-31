<script>
  import { page } from '$app/stores'
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import Counter from "$lib/components/Counter.svelte";
  import axios from "$lib/utils/axios.customize.js";
  import Header from "$lib/components/Header.svelte";
  import BackBtn from "$lib/components/BackBtn.svelte";
  
  let shopId, productsCount;
  const productsInfo = writable();
  
  const addProductToCart = () => {
    const id = $productsInfo.id;
    const name = $productsInfo.name;
    const price = $productsInfo.price;
    const shopName = $productsInfo.shop.name;
    const quantity = productsCount;
    
    let cart = JSON.parse(localStorage.getItem("cart"));
    const index = cart.findIndex((item) => item.id === id);
    if (index >= 0) cart[index].quantity += quantity; 
    else cart = [...cart, {id, name, price, shopName, quantity}];
    localStorage.setItem("cart", JSON.stringify(cart));
    
    alert('Thêm vào giỏ hàng thành công');
    location.href='../';
  }
  const buyProduct = () => {
    const id = $productsInfo.id;
    const name = $productsInfo.name;
    const price = $productsInfo.price;
    const shopName = $productsInfo.shop.name;
    const quantity = productsCount;
    
    let cart = JSON.parse(localStorage.getItem("cart"));
    const index = cart.findIndex((item) => item.id === id);
    if (index >= 0) cart[index].quantity += quantity; 
    else cart = [...cart, {id, name, price, shopName, quantity}];
    localStorage.setItem("cart", JSON.stringify(cart));
    
    location.href = "../checkout";
  }
  onMount(async () => {
    shopId = JSON.parse(localStorage.getItem("shopId"));
    const shopRes = await axios.get(`/api/v1/shop/${shopId}`);
    const productsRes = await axios.get(`/api/v1/product/${$page.params.slug}`);
    productsInfo.set(productsRes.data);
  });
</script>


{#if $productsInfo}
<head>
  <title>{$productsInfo.name}</title>
</head>
<Header title="Xem sản phẩm" />
<div class="bg-white flex flex-col gap-4 px-12 py-8">
  <div>
    <BackBtn />
  </div>
  
  <div class=" flex gap-4">
    <img src={$productsInfo.image} alt="UchiMusume6" class=" h-[50vh] select-none pointer-events-none" />
    
    <div class=" flex-1 flex flex-col gap-4">
      <div>
        <span class="font-bold after:content-[':']">Tên sản phẩm</span> {$productsInfo.name}
      </div>
      <div>
        <span class="font-bold after:content-[':']">Giá</span> {$productsInfo.price}đ
      </div>
      <div>
        <span class="font-bold after:content-[':']">Shop</span> {$productsInfo.shop.name}
      </div>
      <div>
        <span class="font-bold after:content-[':']">Mô tả</span> {$productsInfo.description}
      </div>
      <div class="flex items-center gap-4">
        <span class="font-bold after:content-[':']">Số lượng</span> 
        <Counter bind:count={productsCount} maxCount={$productsInfo.quantity}/>
        <span class="text-tprim">{$productsInfo.quantity} sản phẩm có sẵn</span>
      </div>
      <div class="self-end flex gap-4">
        {#if $productsInfo.quantity > 0}
        <button class="authenbtn uppercase px-4" on:click={addProductToCart}>Thêm vào giỏ hàng</button>
        <button class="bluebtn uppercase" on:click={buyProduct}>Mua hàng</button>
        {:else}
        <button class="bg-slate-200 uppercase p-4" disabled>Hết hàng</button>
        {/if}
      </div>
    </div>
  </div>
</div>
{/if}