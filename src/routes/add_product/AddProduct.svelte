<script>
  import Header from "$lib/components/Header.svelte";
  import BackBtn from "$lib/components/BackBtn.svelte";
  import BlueBtn from "$lib/components/BlueBtn.svelte";
  import { onMount } from 'svelte';
  import axios from "$lib/utils/axios.customize.js";
  import { writable } from "svelte/store";
  
  let descrRowsCount = 4;
  let shopId;
  const factoryInfo = writable();
  const typeInfo = writable();
  
  const addProduct = async () => {
    const name = add_product_name.value;
    const description = add_product_descr.value;
    const image = add_product_image.value;
    const typeId = Number(add_product_type.value);
    const factoryId = Number(add_product_factory.value);
    const price = Number(add_product_price.value);
    const quantity = Number(add_product_quantity.value);
    console.log({name, description, image, typeId, factoryId, price, quantity, shopId});
    const res = await axios.post("/api/v1/product", {name, description, image, typeId, factoryId, price, quantity, shopId});
    console.log(res);
    if(res.statusCode >= 200 && res.statusCode < 300) {
      alert('Thêm sản phẩm thành công!');
      history.back();
      history.back();
    } else {
      alert(res.message);
    }
  }
  onMount(async () => {
    shopId = JSON.parse(localStorage.getItem("shopId"));

    // Make textarea auto resize
    add_product_descr.addEventListener("input", () => {
      add_product_descr.style.height = '0';
      descrRowsCount = Math.max(4, Math.floor(add_product_descr.scrollHeight/24));
      add_product_descr.style.height = 'auto';
    });
    
    const typeRes = await axios.get("/api/v1/type-product");
    typeInfo.set(typeRes.data);
    const factoryRes = await axios.get("/api/v1/factory");
    factoryInfo.set(factoryRes.data);
  });
</script>

<head>
  <title>Thêm sản phẩm</title>
</head>

<div class=" col-span-2 grid items-center">
  <div class="">
    <Header title="Thêm sản phẩm" />
  </div>
  <div class=" bg-white flex flex-col gap-4 p-14 pt-8">
    <BackBtn />
    <div class="text-4xl/normal font-bold border-b-2 border-tprim">Thông tin sản phẩm cần thêm</div>
    <form class="flex flex-col gap-8 px-12">
      <div class="flex flex-col gap-4">
        <div>
          <label for="add_product_name">Tên</label>
          <input
          type="text"
          id="add_product_name"
          class="input-line"
          placeholder="Giày Adidas"
          autocomplete="name"
          required
          />
        </div>
        <div>
          <label for="add_product_descr">Mô tả</label>
          <textarea
          rows={descrRowsCount}
          type="text"
          id="add_product_descr"
          class="input-line"
          placeholder="Giày sneaker xịn."
          autocomplete="on"
          required
          />
        </div>
        <div>
          <label for="add_product_image">Hình ảnh minh họa</label>
          <input
          type="text"
          id="add_product_image"
          class="input-line"
          placeholder="https://static.wikia.nocookie.net/otonari-no-tenshisama-tieng-viet/images/3/38/Shiina_Mahiru_%28Teaser_Visual_2%29.jpg/revision/latest?cb=20220326094422&path-prefix=vi"
          autocomplete="name"
          required
          />
        </div>
        <div class="flex">
          <div class="inline-block w-[50%]">
            <label for="add_product_type">Thể loại</label>
            <select name="add_product_type" id="add_product_type" class="block">
              {#if $typeInfo}
              {#each $typeInfo as {id, name} (id) }
              <option value={id}>{name}</option>
              {/each}
              {/if}
            </select>
          </div>
          <div class="inline-block w-[50%]">
            <label for="add_product_factory">Nhà sản xuất</label>
            <select name="add_product_factory" id="add_product_factory" class="block">
              {#if $factoryInfo}
              {#each $factoryInfo as {id, name} (id) }
              <option value={id}>{name}</option>
              {/each}
              {/if}
            </select>
          </div>
        </div>
        <div class="flex justify-between gap-4">
          <div class="flex-1">
            <label for="add_product_price">Giá</label>
            <div class="flex">
              <input
              type="number"
              id="add_product_price"
              class="input-line text-right"
              step="1000"
              min="0"
              placeholder="100000"
              autocomplete="transaction-amount"
              required
              />
              <span class=" p-2 border-b border-black">VND</span>
            </div>
          </div>
          
          <div class="flex-1">
            <label for="add_product_quantity">Số lượng</label>
            <input
            type="number"
            id="add_product_quantity"
            class="input-line"
            min="0"
            placeholder="100"
            autocomplete="on"
            required
            />
          </div>
        </div>
        <div class="self-end">
          <button class="bluebtn uppercase" on:click={addProduct}>Thêm</button>
        </div>
      </form>
    </div>
  </div>
  
  