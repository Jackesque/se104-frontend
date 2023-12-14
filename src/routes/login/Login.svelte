<head>
  <title>Đăng nhập</title>
</head>
<div class="container">
  <div>
    <h1 class="header">CHÀO MỪNG ĐẾN UIT - COM !</h1>
    <p class="title-1">
      Người dùng mới?
      <a class="create-acc" href="../html/sign-up.html">Tạo tài khoản</a>
    </p>
  </div>
  <div class="login">
    <div class="email">
      <label for="#">Địa chỉ Email:</label> <br />
      <input
      type="email"
      id="email"
      placeholder="Nhập email của bạn..."
      required
      />
    </div>
    <div class="pass">
      <label for="#">Mật khẩu:</label><br />
      <input
      type="password"
      id="pass"
      placeholder="Nhập mật khẩu của bạn..."
      required
      />
    </div>
    <a href="https://www.facebook.com/">
      <button id="button">ĐĂNG NHẬP</button>
    </a>
    <!-- <input type="button" id="button" value="ĐĂNG NHẬP" /> -->
  </div>
</div>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  
  body {
    height: 100vh;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #e9f1f9;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .container {
    width: 1107px;
    height: 685px;
    flex-shrink: 0;
    border-radius: 30px;
    background: #fff;
  }
  
  .header {
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding-left: 59px;
    margin-top: 56px;
  }
  
  .title-1 {
    color: #2f2736;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top: 42px;
    padding-left: 90px;
  }
  
  .title-1 .create-acc {
    color: #0058a8;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-decoration: none;
  }
  .login {
    height: 300px;
    width: 500px;
    color: #2f2736;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-left: 107px;
    margin-top: 28px;
    position: relative;
  }
  
  .login #email {
    width: 490px;
    height: 51px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #000;
    margin-bottom: 76px;
    padding-left: 10px;
    transition: background-color 0.3s;
  }
  
  .login #email:focus {
    outline: none;
    background-color: rgba(232, 240, 254, 0.5);
  }
  
  .login #pass {
    width: 490px;
    height: 51px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #000;
    padding-left: 10px;
    transition: background-color 0.3s;
  }
  
  .login #pass:focus {
    outline: none;
    background-color: rgba(232, 240, 254, 0.5);
  }
  
  .login #button {
    width: 187px;
    height: 58px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #2a93fc;
    border: none;
    color: #fff;
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .login #button:hover {
    background-color: #205fcb;
  }
  
</style>