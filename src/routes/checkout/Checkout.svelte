<script>
  import Header from "$lib/components/Header.svelte";
  import BackBtn from "$lib/components/BackBtn.svelte";
  import BlueBtn from "$lib/components/BlueBtn.svelte";
  import TableHead from "$lib/components/TableHead.svelte";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import axios from "$lib/utils/axios.customize.js";
  
  
  let userId, cart, totalPrice;
  const userInfo = writable();
  let isEditing = false;
  
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
  
  const handleCheckout = async () => {
    // {
      // "userId": 1,
      // "address": "123 xz",
      // "phoneNumber": "012345",
      // "productPrice": 58.5,
      // "deliveryPrice": 10,
      // "deliveryId": 5,
      // "deliveryVoucherId":1,
      // "detail": [
      //     {
        //         "productId": 5,
        //         "shopVoucherId": 2,
        //         "quantity": 3,
        //         "price": 15
        //     },
        const address = $userInfo.address;
        const phoneNumber = $userInfo.phoneNumber;
        const productPrice = totalPrice;
        const deliveryPrice = 0;
        const deliveryId = 1;
        const detail = cart.map((item) => {return {productId: item.id, quantity: item.quantity, price: item.price};});
        const res = await axios.post('api/v1/order', {userId, address, phoneNumber, productPrice, deliveryPrice, deliveryId, detail});
        if(res.statusCode >= 200 && res.statusCode < 300) {
          alert('Đặt hàng thành công!');
          localStorage.setItem("cart", JSON.stringify([]));
          location.href = "../";
        } else {
          alert(res.message);
        }
      }
      
      onMount(async () => {
        userId = JSON.parse(localStorage.getItem("userId"));
        cart = JSON.parse(localStorage.getItem("cart"));
        const userRes = await axios.get(`/api/v1/user/${userId}`);
        userInfo.set(userRes.data);
        totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      });
    </script>
    <head>
      <title>Đơn hàng</title>
    </head>
    
    {#if $userInfo}
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
              <!-- <span class="inline-block select-none cursor-text" on:dblclick={toggleEditing} role="button" tabindex="-1">{$userInfo.name}</span> -->
              <span class="inline-block cursor-text">
                {$userInfo.name}
              </span>
            </div>
            <div>
              <span class=" font-bold after:content-[':'] after:font-normal">Số điện thoại</span>
              <!-- <span class="inline-block select-none cursor-text" on:dblclick={toggleEditing} role="button" tabindex="-1"></span> -->
              <span class="inline-block cursor-text">
                {$userInfo.phoneNumber}
              </span>
            </div>
            <div>
              <!-- <span class="inline-block select-none cursor-text" on:dblclick={toggleEditing} role="button" tabindex="-1"></span> -->
              <span class=" font-bold after:content-[':'] after:font-normal">Địa chỉ</span>
              <span class="inline-block cursor-text">
                {$userInfo.address}
              </span>
            </div>
          </div>
          <!-- <BlueBtn title="Chỉnh sửa" class="uppercase" on:click={toggleEditing} /> -->
          {:else}
          <div>
            <div>
              <span class=" font-bold after:content-[':'] after:font-normal">Tên người mua</span>
              <span class="inline-block px-1 outline outline-1 outline-black" contenteditable autofocus bind:innerText={$userInfo.name} use:handleKeydownName>
                {$userInfo.name}
              </span>
            </div>
            <div>
              <span class=" font-bold after:content-[':'] after:font-normal">Số điện thoại</span>
              <span class="inline-block px-1 outline outline-1 outline-black" contenteditable autofocus bind:innerText={$userInfo.phoneNumber} use:handleKeydownPhone>
                {$userInfo.phone}
              </span>
            </div>
            <div>
              <span class=" font-bold after:content-[':'] after:font-normal">Địa chỉ</span>
              <span class="inline-block px-1 outline outline-1 outline-black" contenteditable autofocus bind:innerText={$userInfo.address} use:handleKeydownAddress>
                {$userInfo.address}
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
              <TableHead title="Giá" />
            </th>
            <th>
              <TableHead title="Shop" />
            </th>
            <th>
              <TableHead title="Số lượng" />
            </th>
          </tr>
          <!-- Dữ liệu sản phẩm sẽ được thêm vào đây -->
          {#each cart as {id, name, price, shopName, quantity} (id) }
          <tr class="text-center">
            <td class="px-2"><span></span></td>
            <td class="px-2">{name}</td>
            <td class="px-2">{price}đ</td>
            <td class="px-2">{shopName}</td>
            <td class="px-2">{quantity}</td>
          </tr>
          {/each}
        </table>
      </div>
      <div class="flex justify-between">
        <div></div>
        <div class="text-center">
          <span class="font-bold after:content-[':'] after:font-normal">Tổng tiền</span>
          {totalPrice}đ
          <a href="../checkout" class="bluebtn uppercase" on:click={handleCheckout}>Thanh toán</a>
        </div>
      </div>
    </div>
    {/if}
    
    <style>
      table {
        counter-reset: section;
      }
      
      tr > td:first-of-type > span::before {
        content: counter(section);
        counter-increment: section;
      }
    </style>