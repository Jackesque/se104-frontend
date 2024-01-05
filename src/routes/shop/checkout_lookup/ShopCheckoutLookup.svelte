<script>
  import Header from "$lib/components/Header.svelte";
  import BackBtn from "$lib/components/BackBtn.svelte";
  import BlueBtn from "$lib/components/BlueBtn.svelte";
  import TableHead from "$lib/components/TableHead.svelte";
  import { onMount } from "svelte";
  import axios from "$lib/utils/axios.customize.js";
  import { writable } from "svelte/store";
  
  let userId, shopId;
  const checkoutInfo = writable();
  const filterProduct = async (node) => {
    node.addEventListener("input", async () => {
      const checkoutRes = await axios.get(`/api/v1/order/shop/${shopId}`);
      if (node.value.length > 0) checkoutInfo.set(checkoutRes.data.filter((item) => Number(item.billId) === Number(node.value)));
      else checkoutInfo.set(checkoutRes.data);
    });
  }
  onMount(async () => {
    userId = JSON.parse(localStorage.getItem("userId"));
    shopId = JSON.parse(localStorage.getItem("shopId"));
    const checkoutRes = await axios.get(`/api/v1/order/shop/${shopId}`);
    console.log("checkoutres", checkoutRes);
    checkoutInfo.set(checkoutRes.data);
  });
</script>
<head>
  <title>Tra cứu đơn hàng</title>
</head>

<Header title="Tra cứu đơn hàng" />
<div class=" bg-white p-14 pt-8">
  <BackBtn />
  <div class="flex justify-evenly shadow-lg">
    <fieldset class="text-lg rounded border-2 border-solid border-[#c5c5c5] px-4 pt-1 pb-3 min-w-[40%] mx-5 my-8">
      <legend class=" text-tprim">Tra cứu đơn hàng</legend>
      <input class=" p-0 w-full text-lg border-none outline-none focus:ring-0" type="text" name="filter_product" id="filter_product" placeholder="Nhập mã đơn hàng" use:filterProduct />
    </fieldset>
    <div class="w-96"></div>
  </div>
  <div class="flex flex-col gap-4 p-4">
    <table class=" min-w-[80%] border-collapse border border-black mx-auto">
      <tr>
        <th>
          <TableHead title="Mã chi tiết đơn hàng" />
        </th>
        <th>
          <TableHead title="Mã đơn hàng" />
        </th>
        <th>
          <TableHead title="Tên sản phẩm" />
        </th>
        <!-- <th>
          <TableHead title="Tên người mua" />
        </th> -->
        <th>
          <TableHead title="Số lượng" />
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
      {#if $checkoutInfo}
      {#each $checkoutInfo as {id, billId, quantity, product, price, status, createdAt} (id) }
      <tr>
        <td class=" text-center px-2 py-1">{id}</td>
        <td class=" text-center px-2 py-1">{billId}</td>
        <td class=" text-center px-2 py-1">{product.name}</td>
        <td class=" text-center px-2 py-1">{quantity}</td>
        <!-- <td class=" text-center px-2 py-1">{user.name}</td> -->
        <td class=" text-center px-2 py-1">{price}</td>
        <td class=" text-center px-2 py-1">{status === 'PENDING' ? 'Chờ xác nhận' : 'Đang giao'}</td>
        <td class=" text-center px-2 py-1">{createdAt.slice(0, 10).split('-').reverse().join('/')}</td>
      </tr>
      {/each}
      {/if}
    </table>
    <!-- <div class="flex gap-4 justify-end">
      <a href="../order_status_lookup" class="underline text-blue-400 hover:text-blue-700 active:text-red-400">Tra cứu tình trạng đơn hàng</a>
      <a href="." class="underline text-blue-400 hover:text-blue-700 active:text-red-400">Khiếu nại / Hoàn tiền</a>
    </div> -->
  </div>
</div>