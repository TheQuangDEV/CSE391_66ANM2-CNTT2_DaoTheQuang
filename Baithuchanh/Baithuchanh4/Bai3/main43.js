const form = document.getElementById("registerForm");

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

function showError(id, message) {
  document.getElementById(id + "Error").textContent = message;
}

function clearError(id) {
  document.getElementById(id + "Error").textContent = "";
}

function validateFullname() {
  let value = fullname.value.trim();

  let regex = /^[A-Za-zÀ-ỹ\s]+$/;

  if (value === "") {
    showError("fullname", "Không được để trống");
    return false;
  }

  if (value.length < 3) {
    showError("fullname", "Ít nhất 3 ký tự");
    return false;
  }

  if (!regex.test(value)) {
    showError("fullname", "Chỉ chứa chữ cái");
    return false;
  }

  clearError("fullname");
  return true;
}

function validateEmail() {
  let value = email.value.trim();

  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value === "") {
    showError("email", "Email không được trống");
    return false;
  }

  if (!regex.test(value)) {
    showError("email", "Email không đúng định dạng");
    return false;
  }

  clearError("email");
  return true;
}

function validatePhone() {
  let value = phone.value.trim();

  let regex = /^0\d{9}$/;

  if (value === "") {
    showError("phone", "Không được để trống");
    return false;
  }

  if (!regex.test(value)) {
    showError("phone", "SĐT phải 10 số và bắt đầu bằng 0");
    return false;
  }

  clearError("phone");
  return true;
}

function validatePassword() {
  let value = password.value;

  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (value === "") {
    showError("password", "Không được để trống");
    return false;
  }

  if (!regex.test(value)) {
    showError("password", "≥8 ký tự có chữ hoa, chữ thường, số");
    return false;
  }

  clearError("password");
  return true;
}

function validateConfirmPassword() {
  if (confirmPassword.value !== password.value) {
    showError("confirmPassword", "Mật khẩu không khớp");
    return false;
  }

  clearError("confirmPassword");
  return true;
}

function validateGender() {
  let gender = document.querySelector('input[name="gender"]:checked');

  if (!gender) {
    showError("gender", "Chọn giới tính");
    return false;
  }

  clearError("gender");
  return true;
}

function validateTerms() {
  if (!terms.checked) {
    showError("terms", "Bạn phải đồng ý điều khoản");
    return false;
  }

  clearError("terms");
  return true;
}

fullname.addEventListener("blur", validateFullname);
email.addEventListener("blur", validateEmail);
phone.addEventListener("blur", validatePhone);
password.addEventListener("blur", validatePassword);
confirmPassword.addEventListener("blur", validateConfirmPassword);

fullname.addEventListener("input", () => clearError("fullname"));
email.addEventListener("input", () => clearError("email"));
phone.addEventListener("input", () => clearError("phone"));
password.addEventListener("input", () => clearError("password"));
confirmPassword.addEventListener("input", () => clearError("confirmPassword"));

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid =
    validateFullname() &
    validateEmail() &
    validatePhone() &
    validatePassword() &
    validateConfirmPassword() &
    validateGender() &
    validateTerms();

  if (isValid) {
    form.style.display = "none";

    document.getElementById("successMessage").innerHTML =
      `Đăng ký thành công! 🎉 <br> Chào ${fullname.value}`;
  }
});
