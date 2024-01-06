<script>
  import Header from "$lib/components/Header.svelte";
  import BackBtn from "$lib/components/BackBtn.svelte";
  import BlueBtn from "$lib/components/BlueBtn.svelte";
  import TableHead from "$lib/components/TableHead.svelte";
  import { onMount } from "svelte";
  import axios from "$lib/utils/axios.customize.js";
  import { writable } from "svelte/store";
  
  let userId;
  const checkoutInfo = writable();
  const filterProduct = async (node) => {
    node.addEventListener("input", async () => {
      const checkoutRes = await axios.get(`/api/v1/order/by-user/${userId}`);
      if (node.value.length > 0) checkoutInfo.set(checkoutRes.data.filter((item) => Number(item.id) === Number(node.value)));
      else checkoutInfo.set(checkoutRes.data);
    });
  }
  
  const editCheckoutStatus = async (id, condition) => {
    if (condition === 'COMPLETE') {
      const confirmCancel = confirm(`Bạn đã nhận được đơn hàng ${id} chưa?`);
      if (confirmCancel) {
        const res = await axios.put(`/api/v1/order/${id}`, {status: 'COMPLETE'});
      }
    }
    const checkoutRes = await axios.get(`/api/v1/order/by-user/${userId}`);
    console.log("checkoutres", checkoutRes);
    checkoutInfo.set(checkoutRes.data);
  }
  
  onMount(async () => {
    userId = JSON.parse(localStorage.getItem("userId"));
    const checkoutRes = await axios.get(`/api/v1/order/by-user/${userId}`);
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
          <TableHead title="Mã đơn hàng" />
        </th>
        <th>
          <TableHead title="Tên sản phẩm" />
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
        <th>
          <TableHead title="Xác nhận đã nhận hàng" />
        </th>
      </tr>
      {#if $checkoutInfo}
      {#each $checkoutInfo as {id, billDetail, user, phoneNumber, address, productPrice, createdAt} (id) }
      <tr>
        <td class=" text-center px-2 py-1">{id}</td>
        <td class=" text-center px-2 py-1">
          {#each billDetail as {product}}
          <div>{product.name}</div>
          {/each}
        </td>
        <td class=" text-center px-2 py-1">
          {#each billDetail as {product}}
          <div>{product.shop.name}</div>
          {/each}
        </td>
        <td class=" text-center px-2 py-1">{user.name}</td>
        <td class=" text-center px-2 py-1">{phoneNumber}</td>
        <td class=" text-center px-2 py-1">{address}</td>
        <td class=" text-center px-2 py-1">{productPrice}</td>
        <td class=" text-center px-2 py-1">
          {#each billDetail as {status}}
          {#if status === 'PENDING'}
          <div>Chờ xác nhận</div>
          {:else if status === 'SHIPPING'}
          <div>Đang giao</div>
          {:else if status === 'CANCELED'}
          <div>Đã bị hủy</div>
          {:else if status === 'COMPLETE'}
          <div>Đã giao thành công</div>
          {/if}
          {/each}
        </td>
        <td class=" text-center px-2 py-1">{createdAt.slice(0, 10).split('-').reverse().join('/')}</td>
        <td class=" text-center px-2 py-1">
          <div class="flex flex-col items-center">
            {#each billDetail as {id, status}}
            {#if status === "PENDING"}
            <div>Chờ xác nhận</div>
            {:else if status === "COMPLETE"}
            <div>Đã nhận hàng</div>
            {:else if status === "CANCELED"}
            <div>Đơn hàng đã bị hủy</div>
            {:else if status === "SHIPPING"}
            <button class="block px-2 my-1 bg-slate-300 rounded" on:click={() => editCheckoutStatus(id, "COMPLETE")}>Xác nhận</button>
            {/if}
            {/each}
          </div>
        </td>
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