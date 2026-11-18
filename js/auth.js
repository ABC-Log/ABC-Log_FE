document.addEventListener('DOMContentLoaded', function () {
  var signupForm = document.getElementById('signup-form');
  var loginForm = document.getElementById('login-form');
  var status = document.getElementById('auth-status');

  if (signupForm) {
    signupForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var password = document.getElementById('signup-password').value;
      var confirmPassword = document.getElementById('signup-password-confirm').value;
      if (password !== confirmPassword) {
        status.textContent = '비밀번호가 서로 다릅니다. 다시 확인해 주세요.';
        document.getElementById('signup-password-confirm').focus();
        return;
      }
      status.textContent = '회원가입 API 연결 후 이용할 수 있습니다.';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      status.textContent = '로그인 API 연결 후 이용할 수 있습니다.';
    });
  }
});
