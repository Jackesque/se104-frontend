<script>
  import Header from "$lib/components/Header.svelte";
  import Button from "$lib/components/Button.svelte";
</script>

<head>
  <title>Đăng nhập</title>
</head>

<Header title="Đăng nhập" />
<div class=" h-[calc(100vh-112px)] bg-bgprim flex justify-center items-start">
  
  <div class=" bg-white flex flex-col gap-4 p-14 pt-8">
    <div>
      <div class=" text-5xl/normal font-bold">CHÀO MỪNG ĐẾN UIT - COM !</div>
      Người dùng mới?
      <a class=" text-tprim font-bold hover:bg-bgprim" href="../html/sign-up.html">Tạo tài khoản</a>
    </div>
    <form class="flex flex-col gap-8 px-12">
      <div class="flex flex-col gap-4">
        
        <div>
          
          <label for="email">Địa chỉ Email:</label>
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
          
          <label for="#">Mật khẩu:</label>
          <input
          type="password"
          id="pass"
          class="input-line"
          placeholder="Pa$sw0rd"
          autocomplete="current-password"
          required
          />
        </div>
      </div>
      <div class="self-end">
        
        <Button href="" title="Đăng nhập"/>
      </div>
      <!-- <input type="button" id="button" value="ĐĂNG NHẬP" /> -->
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