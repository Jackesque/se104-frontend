<script>
  import Header from "$lib/components/Header.svelte";
  import BackBtn from "$lib/components/BackBtn.svelte";
  import BlueBtn from "$lib/components/BlueBtn.svelte";
  import TableHead from "$lib/components/TableHead.svelte";
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
      <input class=" p-0 w-full text-lg border-none outline-none focus:ring-0" type="text" name="" id="" />
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
          <TableHead title="Tên" />
        </th>
        <th>
          <TableHead title="Mô tả" />
        </th>
        <th>
          <TableHead title="Thể loại" />
        </th>
        <th>
          <TableHead title="Giá" />
        </th>
        <th>
          <TableHead title="Số lượng" />
        </th>
      </tr>
    </table>
  </div>
</div>