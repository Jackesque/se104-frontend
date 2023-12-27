<script>
  import Header from "$lib/components/Header.svelte";
  import BackBtn from "$lib/components/BackBtn.svelte";
  import BlueBtn from "$lib/components/BlueBtn.svelte";
  import TableHead from "$lib/components/TableHead.svelte";
  import { onMount } from "svelte";
  
  let isEditing = false;
  let userInfo = {
    name: 'Nguyen Van A',
    phone: '0987654321',
    address: 'Số 6 đường D1, Khu Công Nghiệp Tân Bình, phường Tây Thạnh, quận Tân Phú, TP. Hồ Chí Minh',
  };
  const toggleEditing = () => {
    isEditing = !isEditing;
  }
  const handleKeydownName = (node) => {
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        userInfo.name = node.innerText;
        toggleEditing();
      }
    });
  }
  const handleKeydownPhone = (node) => {
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        userInfo.phone = node.innerText;
        toggleEditing();
      }
    });
  }
  const handleKeydownAddress = (node) => {
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        userInfo.address = node.innerText;
        toggleEditing();
      }
    });
  }
</script>
<head>
  <title>Đơn hàng</title>
</head>

<Header title="Đơn hàng" />
<div class=" bg-white flex flex-col gap-4 p-14 pt-8">
  <BackBtn />
  <div class="text-4xl/normal font-bold border-b-2 border-tprim">Thông tin đơn hàng</div>
  <div class=" shadow-lg flex justify-center py-4">
    <div class="w-[80%] flex justify-between">
      {#if (!isEditing)}
      <div>
        <div>
          <span class=" font-bold after:content-[':'] after:font-normal">Tên người mua</span>
          <!-- <span class="inline-block select-none cursor-text" on:dblclick={toggleEditing} role="button" tabindex="-1"></span> -->
          <span class="inline-block cursor-text">
            {userInfo.name}
          </span>
        </div>
        <div>
          <span class=" font-bold after:content-[':'] after:font-normal">Số điện thoại</span>
          <!-- <span class="inline-block select-none cursor-text" on:dblclick={toggleEditing} role="button" tabindex="-1"></span> -->
          <span class="inline-block cursor-text">
            {userInfo.phone}
          </span>
        </div>
        <div>
          <!-- <span class="inline-block select-none cursor-text" on:dblclick={toggleEditing} role="button" tabindex="-1"></span> -->
          <span class=" font-bold after:content-[':'] after:font-normal">Địa chỉ</span>
          <span class="inline-block cursor-text">
            {userInfo.address}
          </span>
        </div>
      </div>
      <!-- <BlueBtn title="Chỉnh sửa" class="uppercase" on:click={toggleEditing} /> -->
      {:else}
      <div>
        <div>
          <span class=" font-bold after:content-[':'] after:font-normal">Tên người mua</span>
          <span class="inline-block px-1 outline outline-1 outline-black" contenteditable autofocus bind:innerText={userInfo.name} use:handleKeydownName>
            {userInfo.name}
          </span>
        </div>
        <div>
          <span class=" font-bold after:content-[':'] after:font-normal">Số điện thoại</span>
          <span class="inline-block px-1 outline outline-1 outline-black" contenteditable autofocus bind:innerText={userInfo.phone} use:handleKeydownPhone>
            {userInfo.phone}
          </span>
        </div>
        <div>
          <span class=" font-bold after:content-[':'] after:font-normal">Địa chỉ</span>
          <span class="inline-block px-1 outline outline-1 outline-black" contenteditable autofocus bind:innerText={userInfo.address} use:handleKeydownAddress>
            {userInfo.address}
          </span>
        </div>
      </div>
      <BlueBtn title="Xong" class="uppercase" id="done_btn" />
      {/if}
    </div>
  </div>
  <div class="p-4">
    <table class=" w-[80%] border-collapse border border-black mx-auto">
      <tr>
        <th>
          <TableHead title="STT" />
        </th>
        <th>
          <TableHead title="Sản phẩm" />
        </th>
        <th>
          <TableHead title="Shop" />
        </th>
        <th>
          <TableHead title="Giá" />
        </th>
        <th>
          <TableHead title="Số lượng" />
        </th>
      </tr>
      <!-- Dữ liệu sản phẩm sẽ được thêm vào đây -->
      
    </table>
  </div>
  <div class="flex justify-around">
    <div></div>
    <div>
      <span class="font-bold after:content-[':'] after:font-normal">Tổng tiền</span>
      100000 VND
    </div>
  </div>
</div>