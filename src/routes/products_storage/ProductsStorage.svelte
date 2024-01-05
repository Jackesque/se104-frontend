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
  const deleteProduct = async (id) => {
    const item = $productsInfo.find(item => item.id === id);
    const isDeleted = confirm(`Bạn có muốn xóa sản phẩm ${item.name} không?`);
    if (!isDeleted) return;

    const res = await axios.delete('/api/v1/product', {data: {id}});
    const productsRes = await axios.post("/api/v1/product/all", {shopId});
    productsInfo.set(productsRes.data);
    alert("Xóa sản phẩm thành công!");
  }
  
  onMount(async () => {
    shopId = JSON.parse(localStorage.getItem("shopId"));
    const typeRes = await axios.get("/api/v1/type-product");
    typeInfo.set(typeRes.data);
    const factoryRes = await axios.get("/api/v1/factory");
    factoryInfo.set(factoryRes.data);
    
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
    <!-- <BlueBtn href="../add_product" title="Thêm" class="uppercase" /> -->
    <a href="../add_product" class="bluebtn"> Thêm sản phẩm</a>
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
        <th>
          <TableHead title="Sửa thông tin" />
        </th>
        <th>
          <TableHead title="Xóa sản phẩm" />
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
        <td class="px-2"><a href="./shop/product/{id}" class="inline-block px-2 bg-slate-200 rounded">Sửa</a></td>
        <td class="px-2"><button class="px-2 bg-slate-200 rounded" on:click={deleteProduct(id)}>Xóa</button></td>
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