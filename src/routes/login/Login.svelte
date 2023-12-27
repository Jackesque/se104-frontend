<script>
  import Header from "$lib/components/Header.svelte";
  import BackBtn from "$lib/components/BackBtn.svelte";
  import BlueBtn from "$lib/components/BlueBtn.svelte";
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
      <BackBtn />
    </div>
    <div>
      <div class=" uppercase text-5xl/normal font-bold">Mừng bạn quay lại UIT-COM</div>
      Người dùng mới?
      <button class=" text-tprim font-bold hover:bg-bgprim" on:click={() => location.replace("../register")}>Tạo tài khoản</button>
    </div>
    <form class="flex flex-col gap-8 px-12">
      <div class="flex flex-col gap-4">
        
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
          
          <label for="password">Mật khẩu</label>
          <input
          type="password"
          id="password"
          class="input-line"
          placeholder="Pa$sw0rd"
          autocomplete="current-password"
          required
          />
        </div>
      </div>
      <div class=" self-center">
        <BlueBtn href="" title="Đăng nhập" class="uppercase"/>
      </div>
    </form>
  </div>
</div>

<style>
  .input-line {
    width: 100%;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
  }
  .input-line:focus {
    --tw-ring-shadow: 0;
  }
  
</style>