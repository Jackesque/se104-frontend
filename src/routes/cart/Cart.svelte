<script>
  import Header from "$lib/components/Header.svelte";
  import BackBtn from "$lib/components/BackBtn.svelte";
  import BlueBtn from "$lib/components/BlueBtn.svelte";
  import TableHead from "$lib/components/TableHead.svelte";
  import { onMount } from "svelte";
  import { derived, writable } from "svelte/store";
  import axios from "$lib/utils/axios.customize.js";
  
  
  let userId, cart, checkoutCart, selectedProducts = [];
  const userInfo = writable();

  const deleteProductFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  const handleCart = async () => {
    if (selectedProducts.length === 0) {
      alert('Vui lòng chọn ít nhất 1 sản phẩm.');
      return;
    }
    checkoutCart = cart.filter(item => selectedProducts.includes(item.id));
    localStorage.setItem("checkoutCart", JSON.stringify(checkoutCart));
    location.href = "../checkout";
  }
  
  onMount(async () => {
    userId = JSON.parse(localStorage.getItem("userId"));
    cart = JSON.parse(localStorage.getItem("cart"));
    const userRes = await axios.get(`/api/v1/user/${userId}`);
    userInfo.set(userRes.data);
  });
</script>
<head>
  <title>Giỏ hàng</title>
</head>

{#if $userInfo}
<Header title="Giỏ hàng" />
<div class=" bg-white flex flex-col gap-4 p-14 pt-8">
  <BackBtn />
  <div class="text-4xl/normal font-bold border-b-2 border-tprim">Thông tin giỏ hàng</div>
  {#if cart.length === 0}
  <div>Bạn chưa thêm sản phẩm nào. Hãy thêm sản phẩm nào!</div>
  {:else}
  <div class="p-4">
    <table class=" w-[80%] border-collapse border border-black mx-auto">
      <tr>
        <th>
          <TableHead title="STT" />
        </th>
        <th>
          <TableHead title="Tên" />
        </th>
        <th>
          <TableHead title="Hình ảnh" />
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
        <th>
          <TableHead title="Chọn mua" />
        </th>
        <th>
          <TableHead title="Xóa" />
        </th>
      </tr>
      <!-- Dữ liệu sản phẩm sẽ được thêm vào đây -->
      {#each cart as {id, name, price, image, shopName, quantity} (id) }
      <tr class="text-center">
        <td class="px-2"><span></span></td>
        <td class="px-2"><div class="flex justify-center items-center py-2"><img src={image} alt="product_image" class="max-h-48 select-none pointer-events-none"></div></td>
        <td class="px-2">{name}</td>
        <td class="px-2">{price}đ</td>
        <td class="px-2">{shopName}</td>
        <td class="px-2">{quantity}</td>
        <td class="px-2"><input type="checkbox" on:click={() => {
          if (selectedProducts.includes(id)) {
            selectedProducts = selectedProducts.filter(checkId => checkId !== id);
          }
          else {
            selectedProducts = [...selectedProducts, id];
          }
        }}></td>
        <td class="px-2"><button class="px-2 bg-slate-200 rounded" on:click={() => deleteProductFromCart(id)}>Xóa</button></td>
      </tr>
      {/each}
    </table>
  </div>
  <div class="flex justify-end">
    <button class="bluebtn uppercase" on:click={handleCart}>Đặt hàng</button>
  </div>
  {/if}
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