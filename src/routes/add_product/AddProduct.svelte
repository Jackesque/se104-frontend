<script>
  import Header from "$lib/components/Header.svelte";
  import BackBtn from "$lib/components/BackBtn.svelte";
  import BlueBtn from "$lib/components/BlueBtn.svelte";
  import { onMount } from 'svelte';
  
  let descrRowsCount = 4;
  onMount(() => {
    // Make textarea auto resize
    add_product_descr.addEventListener("input", () => {
      add_product_descr.style.height = '0';
      descrRowsCount = Math.max(4, Math.floor(add_product_descr.scrollHeight/24));
      add_product_descr.style.height = 'auto';
    });
    
    // Delete "-" key from positive number input
    [add_product_type, add_product_quantity].map((element) => {
      element.addEventListener("input", (e) => {
        if (e.includes("-")) {
          element.value = e.replaceAll("-", "");
        }
      })
    })
  });
</script>

<head>
  <title>Thêm sản phẩm</title>
</head>

<div class=" h-screen grid grid-rows-[auto_1fr] items-center">
  <div class=" row-[1_/_2] col-span-full">
    <Header title="Thêm sản phẩm" />
  </div>
  <div class=" bg-white row-span-full col-span-full flex flex-col gap-4 p-14 pt-8">
    <BackBtn />
    <div class="text-4xl/normal font-bold border-b-2 border-tprim">Thông tin sản phẩm cần thêm</div>
    <form class="flex flex-col gap-8 px-12">
      <div class="flex flex-col gap-4">
        <div>
          <label for="add_product_name">Tên</label>
          <input
          type="text"
          id="add_product_name"
          class="input-line"
          placeholder="Giày Adidas"
          autocomplete="name"
          required
          />
        </div>
        <div>
          <label for="add_product_descr">Mô tả</label>
          <textarea
          rows={descrRowsCount}
          type="text"
          id="add_product_descr"
          class="input-line"
          placeholder="Giày sneaker xịn."
          autocomplete="on"
          required
          />
        </div>
        <div>
          <label for="add_product_type">Thể loại</label>
          <select name="add_product_type" id="add_product_type" class="block">
            <option value="clothes">Áo quần</option>
            <option value="shoes">Giày dép</option>
            <option value="jewelry">Trang sức</option>
          </select>
        </div>
        <div class="flex justify-between gap-4">
          <div class="flex-1">
            <label for="add_product_price">Giá</label>
            <div class="flex">
              <input
              type="number"
              id="add_product_price"
              class="input-line text-right"
              step="1000"
              min="0"
              placeholder="100000"
              autocomplete="transaction-amount"
              required
              />
              <span class=" p-2 border-b border-black">VND</span>
            </div>
          </div>
          
          <div class="flex-1">
            <label for="add_product_quantity">Số lượng</label>
            <input
            type="number"
            id="add_product_quantity"
            class="input-line"
            min="0"
            placeholder="100"
            autocomplete="on"
            required
            />
          </div>
        </div>
        <div class="self-end">
          <BlueBtn href="../products_storage" title="Thêm" class="uppercase" />
        </div>
      </form>
    </div>
  </div>
  
  