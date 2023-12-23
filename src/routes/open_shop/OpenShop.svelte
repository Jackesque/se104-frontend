<script>
  import Header from "$lib/components/Header.svelte";
  import BlueBtn from "$lib/components/BlueBtn.svelte";
  import BackBtn from "$lib/components/BackBtn.svelte";
</script>

<head>
  <title>Đăng kí mở cửa hàng</title>
</head>

<div class=" h-screen grid grid-rows-[auto_1fr] items-center px-36">
  <div class=" row-[1_/_2] col-span-full">
    <Header title="Đăng kí mở cửa hàng" />
  </div>
  <div class=" bg-white row-span-full col-span-full flex flex-col gap-4 p-14 pt-8">
    <BackBtn />
    <div class="text-4xl/normal font-bold border-b-2 border-tprim">Cài đặt thông tin cửa hàng</div>
    <form class="flex flex-col gap-8 px-12">
      <div class="flex flex-col gap-4">
        <div>
          <label for="shopname">Tên cửa hàng</label>
          <input
          type="text"
          id="shopname"
          class="input-line"
          placeholder="ABC Shop"
          autocomplete="email"
          required
          />
        </div>
        <div>
          <label for="email">Địa chỉ email</label>
          <input
          type="email"
          id="email"
          class="input-line"
          placeholder="your.email@domain.com"
          autocomplete="email"
          required
          />
        </div>
        <div>
          
          <label for="tel">Số điện thoại</label>
          <input
          type="tel"
          pattern="^(\d{'{'}10}|\d{'{'}11})$" 
          title="Số điện thoại phải bao gồm 10 hoặc 11 chữ số"
          id="tel"
          class="input-line"
          placeholder="0987654321"
          autocomplete="tel"
          required
          />
        </div>
        <div>
          <label for="products_address">Địa chỉ lấy hàng</label>
          <input
          type="text"
          id="products_address"
          class="input-line"
          placeholder="Số 6 đường D1, Khu Công Nghiệp Tân Bình, phường Tây Thạnh, quận Tân Phú, TP. Hồ Chí Minh"
          autocomplete="address-level4"
          required
          />
        </div>
      </div>
      <div class="self-end">
        <BlueBtn href="" title="Lưu"/>
        
      </div>
    </form>
  </div>
</div>

