<script>
  import { page } from '$app/stores'
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import Counter from "$lib/components/Counter.svelte";
  import axios from "$lib/utils/axios.customize.js";
  import Header from "$lib/components/Header.svelte";
  import BackBtn from "$lib/components/BackBtn.svelte";
  
  let shopId, productsCount, productNewInfo;
  const productInfo = writable();
  const factoryInfo = writable();
  const typeInfo = writable();
  
  const editProductInfo = async () => {
    // "name": "Ao khoac 3",
    // "price": 15,
    // "quantity": 2,
    // "description": "Azadsklweklkawe",
    // "image": "image",
    // "factoryId": 2,
    // "typeId": 2
    let {id, name, price, quantity, description, image, factoryId, typeId} = $productInfo;
    const newProductInfo = {name, price, quantity, description, image, factoryId, typeId};
    const res = await axios.put(`/api/v1/product/${id}`, newProductInfo);
    console.log(res);
    if(res.statusCode >= 200 && res.statusCode < 300) {
      alert('Sửa thông tin thành công!');
      history.back();
    } else {
      alert(res.message);
    }
  }
  
  onMount(async () => {
    shopId = JSON.parse(localStorage.getItem("shopId"));
    const shopRes = await axios.get(`/api/v1/shop/${shopId}`);
    const productsRes = await axios.get(`/api/v1/product/${$page.params.slug}`);
    productInfo.set(productsRes.data);
    
    const typeRes = await axios.get("/api/v1/type-product");
    typeInfo.set(typeRes.data);
    const factoryRes = await axios.get("/api/v1/factory");
    factoryInfo.set(factoryRes.data);
  });
</script>


{#if $productInfo}
<head>
  <title>Sửa thông tin sản phẩm {$productInfo.name}</title>
</head>
<Header title="Sửa thông tin sản phẩm" />
<div class="bg-white flex flex-col gap-4 px-12 py-8">
  <div>
    <BackBtn />
  </div>
  
  <div class=" flex gap-4">
    <img src={$productInfo.image} alt="product_image" class=" h-[50vh] select-none pointer-events-none" />
    
    <div class=" flex-1 flex flex-col gap-4">
      <div>
        <span class="font-bold after:content-[':']">Tên</span>
        <span contenteditable spellcheck="false" class="inline-block px-1 outline outline-1 outline-black" bind:innerText={$productInfo.name}></span>
      </div>
      <div>
        <span class="font-bold after:content-[':']">Mô tả</span> 
        <span contenteditable spellcheck="false" class="inline-block px-1 outline outline-1 outline-black" bind:innerText={$productInfo.description}></span>
      </div>
      <div>
        <span class="font-bold after:content-[':']">Hình ảnh minh họa</span>
        <span contenteditable spellcheck="false" class="inline-block px-1 outline outline-1 outline-black" bind:innerText={$productInfo.image}></span>
      </div>
      <div class="flex">
        <div class="inline-block w-[50%]">
          <label for="add_product_type">Thể loại</label>
          <select name="add_product_type" id="add_product_type" class="block" bind:value={$productInfo.typeId}>
            {#if $typeInfo}
            {#each $typeInfo as {id, name} (id) }
            <option value={id}>{name}</option>
            {/each}
            {/if}
          </select>
        </div>
        <div class="inline-block w-[50%]">
          <label for="add_product_factory">Nhà sản xuất</label>
          <select name="add_product_factory" id="add_product_factory" class="block" bind:value={$productInfo.factoryId}>
            {#if $factoryInfo}
            {#each $factoryInfo as {id, name} (id) }
            <option value={id}>{name}</option>
            {/each}
            {/if}
          </select>
        </div>
      </div>
      <div>
        <span class="font-bold after:content-[':']">Giá</span> 
        <span contenteditable spellcheck="false" class="inline-block px-1 outline outline-1 outline-black me-1" bind:innerText={$productInfo.price}></span>đ
      </div>
      <div>
        <span class="font-bold after:content-[':']">Shop</span>
        <span contenteditable spellcheck="false" class="inline-block px-1 outline outline-1 outline-black" bind:innerText={$productInfo.shop.name}></span>
      </div>
      
      <div class="flex items-center gap-4">
        <span class="font-bold after:content-[':']">Số lượng</span> 
        <span contenteditable spellcheck="false" class="inline-block px-1 outline outline-1 outline-black" bind:innerText={$productInfo.quantity}></span>
      </div>
      <div class="self-end flex gap-4">
        <button class="bluebtn uppercase" on:click={editProductInfo}>Lưu</button>
      </div>
    </div>
  </div>
</div>
{/if}