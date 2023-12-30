<script>
  import Header from "$lib/components/Header.svelte";
  import BackBtn from "$lib/components/BackBtn.svelte";
  import BlueBtn from "$lib/components/BlueBtn.svelte";
  import TableHead from "$lib/components/TableHead.svelte";
  import axios from "$lib/utils/axios.customize.js";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  
  let shopId;
  const typeArray = [];
  const factoryArray = [];
  const factoryInfo = writable();
  const typeInfo = writable();
  const productsInfo = writable();

  const filterProduct = async () => {
    const res = await axios.post(`/api/v1/product/all?name=${filter_product.value}`, {shopId});
    productsInfo.set(res.data);
  }
  
  onMount(async () => {
    shopId = JSON.parse(localStorage.getItem("shopId"));
    const factoryRes = await axios.get("/api/v1/factory");
    factoryInfo.set(factoryRes.data);
    const typeRes = await axios.get("/api/v1/type-product");
    typeInfo.set(typeRes.data);
    const productsRes = await axios.post("/api/v1/product/all", {shopId});
    productsInfo.set(productsRes.data);
    $typeInfo.forEach((item) => {
      typeArray[item.id] = item.name;
    });
    $factoryInfo.forEach((item) => {
      factoryArray[item.id] = item.name;
    });
  });
</script>
<head>
  <title>Danh sách sản phẩm trong kho</title>
</head>

<Header title="Danh sách sản phẩm trong kho" />
<div class=" bg-white p-14 pt-8">
  <BackBtn />
  <div class="flex justify-evenly shadow-lg">
    <fieldset class="text-lg rounded border-2 border-solid border-[#c5c5c5] px-4 pt-1 pb-3 min-w-[40%] mx-5 my-8">
      <legend class=" text-tprim">Tìm sản phẩm</legend>
      <input class=" p-0 w-full text-lg border-none outline-none focus:ring-0" type="text" name="filter_product" id="filter_product" placeholder="Nhập tên sản phẩm" on:input={filterProduct} />
    </fieldset>
    <BlueBtn href="../add_product" title="Thêm" class="uppercase" />
  </div>
  <div class="p-4">
    <table class=" min-w-[80%] border-collapse border border-black mx-auto">
      <tr>
        <th>
          <TableHead title="STT" />
        </th>
        <th>
          <TableHead title="Hình ảnh" />
        </th>
        <th>
          <TableHead title="Tên" />
        </th>
        <th>
          <TableHead title="Mô tả" />
        </th>
        <th>
          <TableHead title="Thể loại" />
        </th>
        <th>
          <TableHead title="Nhà sản xuất" />
        </th>
        <th>
          <TableHead title="Giá" />
        </th>
        <th>
          <TableHead title="Số lượng" />
        </th>
      </tr>
      {#if $productsInfo}
      {#each $productsInfo as {id, name, description, image, typeId, factoryId, price, quantity} (id) }
      <tr class="text-center">
        <td class="px-2"><span></span></td>
        <td class="px-2"><div class="flex justify-center items-center py-2"><img src={image} alt="product_image" class="max-h-48 select-none pointer-events-none"></div></td>
        <td class="px-2">{name}</td>
        <td class="px-2">{description}</td>
        <td class="px-2">{typeArray[typeId]}</td>
        <td class="px-2">{factoryArray[factoryId]}</td>
        <td class="px-2">{price}</td>
        <td class="px-2">{quantity}</td>
      </tr>
      {/each}
      {/if}
    </table>
  </div>
</div>

<style>
  table {
    counter-reset: section;
  }
  
  tr > td:first-of-type > span::before {
    content: counter(section);
    counter-increment: section;
  }
</style>