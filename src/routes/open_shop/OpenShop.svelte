<script>
  import Header from "$lib/components/Header.svelte";
  import BlueBtn from "$lib/components/BlueBtn.svelte";
  import BackBtn from "$lib/components/BackBtn.svelte";
  import axios from "$lib/utils/axios.customize.js";
  
  const openShop = async () => {
    const name = shopname.value;
    const phoneNumber = shop_tel.value;
    const address = products_address.value;
    const userId = JSON.parse(localStorage.getItem("userId"));
    const res = await axios.post("/api/v1/shop", {name, phoneNumber, address, userId});
    console.log(res);
    if(res.statusCode >= 200 && res.statusCode < 300) {
      localStorage.setItem("shopId", JSON.stringify(res.data.id));
      alert('Mở cửa hàng thành công!');
      location.href = "../shop";
    } else {
      alert(res.message);
    }
  }
  
</script>

<head>
  <title>Đăng ký mở cửa hàng</title>
</head>

<div class=" h-screen grid grid-rows-[auto_1fr] items-center">
  <div class=" row-[1_/_2] col-span-full">
    <Header title="Đăng ký mở cửa hàng" />
  </div>
  <div class=" bg-white row-span-full col-span-full flex flex-col gap-4 p-14 pt-8">
    <BackBtn />
    <div class="text-4xl/normal font-bold border-b-2 border-tprim">Thông tin cửa hàng mới</div>
    <form class="flex flex-col gap-8 px-12">
      <div class="flex flex-col gap-4">
        <div>
          <label for="shopname">Tên cửa hàng</label>
          <input
          type="text"
          id="shopname"
          class="input-line"
          placeholder="ABC Shop"
          autocomplete="name"
          required
          />
        </div>
        <div>
          <label for="shop_tel">SĐT cửa hàng</label>
          <input
          type="tel"
          pattern="^(\d{'{'}10}|\d{'{'}11})$" 
          title="Số điện thoại phải bao gồm 10 hoặc 11 chữ số"
          id="shop_tel"
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
        <button class="bluebtn uppercase" on:click={openShop}>Mở cửa hàng</button>
      </div>
    </form>
  </div>
</div>

