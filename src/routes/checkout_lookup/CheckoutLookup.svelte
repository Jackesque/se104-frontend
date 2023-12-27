<script>
  import Header from "$lib/components/Header.svelte";
  import BackBtn from "$lib/components/BackBtn.svelte";
  import BlueBtn from "$lib/components/BlueBtn.svelte";
  import TableHead from "$lib/components/TableHead.svelte";
  
  let checkoutInfo = {
    id: '123',
    productName: 'ABC',
    shopName: 'DEF Shop',
    buyerName: 'Nguyen Van A',
    phone: '0987654321',
    shippingAddress: '123 đường 456C7',
    totalPrice: '100000',
    shippingStatus: 'Đang giao',
    createdAt: new Date(),
  };
</script>
<head>
  <title>Tra cứu đơn hàng</title>
</head>

<Header title="Tra cứu đơn hàng" />
<div class=" bg-white p-14 pt-8">
  <BackBtn />
  <div class="flex justify-evenly shadow-lg">
    <fieldset class="text-lg rounded border-2 border-solid border-[#c5c5c5] px-4 pt-1 pb-3 min-w-[40%] mx-5 my-8">
      <legend class=" text-tprim">Nhập mã đơn hàng</legend>
      <input class=" p-0 w-full text-lg border-none outline-none focus:ring-0" type="text" name="" id="" />
    </fieldset>
    <BlueBtn href="../add_product" title="Tra cứu" class="uppercase" />
  </div>
  <div class="flex flex-col gap-4 p-4">
    <table class=" min-w-[80%] border-collapse border border-black mx-auto">
      <tr>
        <th>
          <TableHead title="Mã đơn hàng" />
        </th>
        <th>
          <TableHead title="Sản phẩm" />
        </th>
        <th>
          <TableHead title="Shop" />
        </th>
        <th>
          <TableHead title="Tên người mua" />
        </th>
        <th>
          <TableHead title="SĐT" />
        </th>
        <th>
          <TableHead title="Địa chỉ" />
        </th>
        <th>
          <TableHead title="Tổng tiền" />
        </th>
        <th>
          <TableHead title="Tình trạng" />
        </th>
        <th>
          <TableHead title="Thời gian lập" />
        </th>
      </tr>
      <tr>
        <td class=" text-center px-2 py-1">{checkoutInfo.id}</td>
        <td class=" text-center px-2 py-1">{checkoutInfo.productName}</td>
        <td class=" text-center px-2 py-1">{checkoutInfo.shopName}</td>
        <td class=" text-center px-2 py-1">{checkoutInfo.buyerName}</td>
        <td class=" text-center px-2 py-1">{checkoutInfo.phone}</td>
        <td class=" text-center px-2 py-1">{checkoutInfo.shippingAddress}</td>
        <td class=" text-center px-2 py-1">{checkoutInfo.totalPrice}</td>
        <td class=" text-center px-2 py-1">{checkoutInfo.shippingStatus}</td>
        <td class=" text-center px-2 py-1">{checkoutInfo.createdAt}</td>
      </tr>
    </table>
    <div class="flex gap-4 justify-end">
      <a href="../order_status_lookup" class="underline text-blue-400 hover:text-blue-700 active:text-red-400">Tra cứu tình trạng đơn hàng</a>
      <!-- <a href="." class="underline text-blue-400 hover:text-blue-700 active:text-red-400">Khiếu nại / Hoàn tiền</a> -->
    </div>
  </div>
</div>