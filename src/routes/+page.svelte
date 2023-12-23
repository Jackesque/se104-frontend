<script>
  import Header from '$lib/components/Header.svelte';
  import BlueBtn from '$lib/components/BlueBtn.svelte';
  import AuthenBtn from '$lib/components/AuthenBtn.svelte';
  import TableHead from '$lib/components/TableHead.svelte';
  import ProductItem from '$lib/components/ProductItem.svelte';
</script>
<head>
  <title>Trang chủ</title>
</head>

<Header title="Trang chủ" />
<div class="bg-white py-4">
  <div class=" w-full flex flex-col">
    <div class="flex justify-between px-12 py-2">
      <div class="flex gap-12">
        <BlueBtn href="./open_shop" title="Kênh Người Bán" />
        <BlueBtn href="" title="Tra Cứu Đơn Hàng" />
        <BlueBtn href="" title="Đơn Hàng" />
      </div>
      <div class="flex gap-12">
        <AuthenBtn href="./login" title="Đăng nhập" />
        <AuthenBtn href="./register" title="Đăng ký" />
      </div>
    </div>
    <div class=" w-full h-48 flex items-center">
      <div class="w-[60%]">
        <fieldset class="text-lg rounded border-2 border-solid border-[#c5c5c5] px-4 pt-1 pb-3 w-[60%] mx-5 my-8">
          <legend class=" text-tprim">Tìm sản phẩm</legend>
          <input class=" p-0 w-full text-lg border-none outline-none focus:ring-0" type="text" name="" id="" />
        </fieldset>
      </div>
      <div class="w-[40%] flex flex-col gap-4 text-center">
        <p class=" text-3xl">Xin chào, Homelander</p>
        <p class=" text-5xl/normal font-bold">UIT-COM</p>
      </div>
    </div>
  </div>
  <table class=" w-[80%] p-4 border-collapse border border-black mx-auto">
    <tr>
      <th>
        <TableHead title="Sản phẩm" />
      </th>
      <th>
        <div></div>
      </th>
    </tr>
    <!-- Dữ liệu sản phẩm sẽ được thêm vào đây -->
    <ProductItem />
    <ProductItem />
    <ProductItem />
  </table>
</div>

<style>
  th {
    border: 1px solid black;
  }
</style>