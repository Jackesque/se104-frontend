<script>
  import Header from "$lib/components/Header.svelte";
  import BackBtn from "$lib/components/BackBtn.svelte";
  import BlueBtn from "$lib/components/BlueBtn.svelte";
  import axios from "$lib/utils/axios.customize.js";
  
  const loginUser = async () => {
    // const emailValue = user_email.value;
    // const passwordValue = user_password.value;
    // const loginUser = {email: emailValue, password: passwordValue,};
    const email = user_email.value;
    const password = user_password.value;
    const res = await axios.post("/api/v1/auth/login", {email, password});
    if(res.statusCode >= 200 && res.statusCode < 300) {
      localStorage.setItem("userId", JSON.stringify(res.data.data.id));
      const shopRes = await axios.get(`/api/v1/shop/user/${res.data.data.id}`);
      localStorage.setItem("shopId", JSON.stringify(shopRes.data.id));
      if (!JSON.parse(localStorage.getItem("cart"))) localStorage.setItem("cart", JSON.stringify([]));
      alert('Đăng nhập thành công!');
      location.href = "../";
    } else {
      alert(res.message);
    }
  }
</script>

<head>
  <title>Đăng nhập</title>
</head>

<div class=" h-screen grid grid-rows-[auto_1fr] justify-center items-center">
  <div class=" row-[1_/_2] col-span-full">
    <Header title="Đăng nhập" />
  </div>
  <div class=" bg-white row-span-full col-span-full flex flex-col gap-4 p-14 pt-8">
    <div>
      <!-- <BackBtn /> -->
    </div>
    <div>
      <div class=" uppercase text-5xl/normal font-bold">Mừng bạn quay lại UIT-COM</div>
      Người dùng mới?
      <button class=" text-tprim font-bold hover:bg-bgprim" on:click={() => location.replace("../register")}>Tạo tài khoản</button>
    </div>
    <form class="flex flex-col gap-8 px-12">
      <div class="flex flex-col gap-4">
        
        <div>
          
          <label for="user_email">Địa chỉ email</label>
          <input
          type="email"
          id="user_email"
          class="input-line"
          placeholder="your.email@domain.com"
          autocomplete="email"
          required
          />
        </div>
        <div>
          
          <label for="user_password">Mật khẩu</label>
          <input
          type="password"
          id="user_password"
          class="input-line"
          placeholder="Pa$sw0rd"
          autocomplete="current-password"
          required
          />
        </div>
      </div>
      <div class=" self-center">
        <BlueBtn href="" title="Đăng nhập" class="uppercase" on:click={loginUser}/>
      </div>
    </form>
  </div>
</div>