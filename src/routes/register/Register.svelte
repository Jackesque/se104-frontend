<script>
  import Header from "$lib/components/Header.svelte";
  import BackBtn from "$lib/components/BackBtn.svelte";
  import BlueBtn from "$lib/components/BlueBtn.svelte";
</script>

<head>
  <title>Đăng ký</title>
</head>

<div class=" h-screen grid grid-rows-[auto_1fr] justify-center items-center">
  <div class=" row-[1_/_2] col-span-full">
    <Header title="Đăng ký" />
  </div>
  <div class=" bg-white row-span-full col-span-full flex flex-col gap-4 p-14 pt-8">
    <div>
      <BackBtn />
    </div>
    <div>
      <div class=" uppercase text-5xl/normal font-bold">Chào mừng bạn đến với UIT-COM !</div>
      Đã có tài khoản?
      <button class=" text-tprim font-bold hover:bg-bgprim" on:click={() => location.replace("../login")}>Đăng nhập</button>
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
          autocomplete="new-password"
          required
          />
        </div>
        <div>
          
          <label for="reenter_password">Xác nhận mật khẩu</label>
          <input
          type="password"
          id="reenter_password"
          class="input-line"
          placeholder="Pa$sw0rd"
          autocomplete="new-password"
          required
          />
        </div>
        <div>
          
          <label for="birthdate">Ngày sinh</label>
          <input
          type="date"
          id="birthdate"
          class="input-line select-none"
          autocomplete="bday"
          onkeydown="return false;"
          onfocus="blur();"
          onclick="this.showPicker();"
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
      </div>
      <div class=" self-center">
        <BlueBtn href="" title="Đăng ký" txtClass="uppercase"/>
      </div>
    </form>
  </div>
</div>
