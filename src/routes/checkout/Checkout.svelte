<script>
  import Header from "$lib/components/Header.svelte";
  import BackBtn from "$lib/components/BackBtn.svelte";
  import BlueBtn from "$lib/components/BlueBtn.svelte";
  import TableHead from "$lib/components/TableHead.svelte";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import axios from "$lib/utils/axios.customize.js";
  
  
  let userId, deliveryId, cart, totalPrice;
  const userInfo = writable();
  const deliveryInfo = writable();
  
  let isEditingName = false;
  let isEditingPhone = false;
  let isEditingAddress = false;
  
  const toggleEditingName = () => {
    isEditingName = !isEditingName;
  }
  const toggleEditingPhone = () => {
    isEditingPhone = !isEditingPhone;
  }
  const toggleEditingAddress = () => {
    isEditingAddress = !isEditingAddress;
  }
  const handleKeydownName = (node) => {
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        toggleEditingName();
      }
    });
  }
  const handleKeydownPhone = (node) => {
      node.addEventListener('input', (e) => {
        e.value = e.value.replace(/\D/g,'');
      });
      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          toggleEditingPhone();
        }
      });
    }
    const handleKeydownAddress = (node) => {
      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          toggleEditingAddress();
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
          const name = $userInfo.name;
          const address = $userInfo.address;
          const phoneNumber = $userInfo.phoneNumber;
          const productPrice = totalPrice;
          const deliveryPrice = $deliveryInfo[deliveryId].price;
          const detail = cart.map((item) => {return {productId: item.id, quantity: item.quantity, price: item.price};});
          const res = await axios.post('api/v1/order', {userId, name, address, phoneNumber, productPrice, deliveryPrice, deliveryId, detail});
          if(res.statusCode >= 200 && res.statusCode < 300) {
            localStorage.setItem("cart", JSON.stringify([]));
            alert('Đặt hàng thành công!');
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
          
          const deliveryRes = await axios.get(`/api/v1/delivery`);
          deliveryInfo.set(deliveryRes.data);
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
            <div>
              <div>
                <span class=" font-bold after:content-[':']">Tên người mua</span>
                {#if (!isEditingName)}
                <button class="inline-block select-none cursor-text" on:dblclick={toggleEditingName}>{$userInfo.name}</button>
                {:else}
                <span class="inline-block px-1 outline outline-1 outline-black" contenteditable bind:innerText={$userInfo.name} use:handleKeydownName>
                  {$userInfo.name}
                </span>
                {/if}
                <button class="px-2 bg-slate-300 rounded" on:click={toggleEditingName}>{isEditingName ? `Xong` : `Sửa`}</button>
              </div>
              
              <div>
                <span class=" font-bold after:content-[':']">Số điện thoại</span>
                {#if (!isEditingPhone)}
                <button class="inline-block select-none cursor-text" on:dblclick={toggleEditingPhone}>{$userInfo.phoneNumber}</button>
                {:else}
                <span class="inline-block px-1 outline outline-1 outline-black" contenteditable bind:innerText={$userInfo.phoneNumber} use:handleKeydownPhone>
                  {$userInfo.phoneNumber}
                </span>
                {/if}
                <button class="px-2 bg-slate-300 rounded" on:click={toggleEditingPhone}>{isEditingPhone ? `Xong` : `Sửa`}</button>
              </div>
              
              <div>
                <span class=" font-bold after:content-[':']">Địa chỉ</span>
                {#if (!isEditingAddress)}
                <button class="inline-block select-none cursor-text" on:dblclick={toggleEditingAddress}>{$userInfo.address}</button>
                {:else}
                <span class="inline-block px-1 outline outline-1 outline-black" contenteditable bind:innerText={$userInfo.address} use:handleKeydownAddress>
                  {$userInfo.address}
                </span>
                {/if}
                <button class="px-2 bg-slate-300 rounded" on:click={toggleEditingAddress}>{isEditingAddress ? `Xong` : `Sửa`}</button>
              </div>
            </div>
          </div>
        </div>
        <div class="p-4">
          <div class="text-2xl py-4">Thông tin sản phẩm</div>
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
        <div class="p-4">
          {#if $deliveryInfo}
          <div class="text-2xl py-4">Đơn vị giao hàng</div>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-1">
              
              <label for="checkout_delivery" class=" font-bold after:content-[':']">Tên đơn vị</label>
              <select name="checkout_delivery" id="checkout_delivery" bind:value={deliveryId}>
                {#each $deliveryInfo as {id, name} (id) }
                <option value={id}>{name}</option>
                {/each}
              </select>
            </div>
            <div class="flex justify-center items-center gap-1">
              
              <span class="font-bold after:content-[':']">Giá</span>
              {#each $deliveryInfo as {id, price} (id) }
              {#if id === deliveryId}<span>{price}đ</span>{/if}
              {/each}
            </div>
          </div>
          {/if}
        </div>
        <div class="flex justify-between">
          <div></div>
          <div class="text-center">
            <span class="font-bold after:content-[':']">Tổng tiền</span>
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