<script>
  import Header from '$lib/components/Header.svelte';
  import Button from '$lib/components/Button.svelte';
  import TableHead from '$lib/components/TableHead.svelte';
</script>
<head>
  <title>Trang chủ</title>
</head>

<Header title="Trang chủ" />
<div>
  <div class=" w-full flex flex-col">
    <div class="w-100 flex gap-12 px-12 py-2">
      <Button href="" title="Kênh Người Bán" />
      <Button href="" title="Tra Cứu Đơn Hàng" />
      <Button href="" title="Đơn Hàng" />
    </div>
    <div class=" w-full h-48 flex items-center">
      <div class="w-[60%]">
        <fieldset class="text-lg rounded border-2 border-solid border-[#c5c5c5] px-4 pt-1 pb-3 w-[500px] mx-5 my-8">
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
  <div class="box-2">
    <div class="grid grid-cols-5 p-4 text-center">
      <TableHead title="sản phẩm" />
      <TableHead title="cửa hàng" />
      <TableHead title="giá" />
      <TableHead title="danh mục" />
      <TableHead title="thông tin" />
      
      <div>
        <!-- Dữ liệu sản phẩm sẽ được thêm vào đây -->
      </div>
    </div>
  </div>
</div>