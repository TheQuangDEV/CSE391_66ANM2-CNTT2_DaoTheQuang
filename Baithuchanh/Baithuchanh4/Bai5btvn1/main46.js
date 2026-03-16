const fullname = document.getElementById("fullname");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const strengthBar = document.getElementById("strength");
const strengthText = document.getElementById("strengthText");

const nameCount = document.getElementById("nameCount");

// ===== ĐẾM KÝ TỰ HỌ TÊN =====
fullname.addEventListener("input", function () {
  let len = fullname.value.length;
  nameCount.textContent = len + "/50";
});

// ===== PASSWORD STRENGTH =====
password.addEventListener("input", function () {
  let val = password.value;
  let strength = 0;

  if (val.length >= 8) strength++;
  if (/[A-Z]/.test(val)) strength++;
  if (/[0-9]/.test(val)) strength++;
  if (/[^A-Za-z0-9]/.test(val)) strength++;

  if (strength <= 1) {
    strengthBar.style.width = "33%";
    strengthBar.style.background = "red";
    strengthText.textContent = "Yếu";
  } else if (strength <= 3) {
    strengthBar.style.width = "66%";
    strengthBar.style.background = "orange";
    strengthText.textContent = "Trung bình";
  } else {
    strengthBar.style.width = "100%";
    strengthBar.style.background = "green";
    strengthText.textContent = "Mạnh";
  }
});

// ===== HIỆN / ẨN PASSWORD =====
togglePassword.addEventListener("click", function () {
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
});

// ===== VALIDATE SUBMIT =====
document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    document.getElementById("successMessage").innerHTML =
      "Đăng ký thành công 🎉";

    this.style.display = "none";
  });
