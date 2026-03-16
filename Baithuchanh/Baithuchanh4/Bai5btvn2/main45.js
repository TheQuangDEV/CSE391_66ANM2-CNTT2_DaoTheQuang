let currentStep = 0;

const steps = document.querySelectorAll(".step");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progressBar = document.getElementById("progressBar");

showStep();

function showStep() {
  steps.forEach((step) => step.classList.remove("active"));
  steps[currentStep].classList.add("active");

  progressBar.style.width = ((currentStep + 1) / steps.length) * 100 + "%";

  prevBtn.style.display = currentStep === 0 ? "none" : "inline";
}

nextBtn.onclick = function () {
  if (currentStep === 0) {
    let hoten = document.getElementById("hoten").value;
    let gioitinh = document.getElementById("gioitinh").value;

    if (hoten == "" || gioitinh == "") {
      alert("Nhập đầy đủ thông tin");
      return;
    }
  }

  if (currentStep === 1) {
    let pass = document.getElementById("password").value;
    let confirm = document.getElementById("confirm").value;

    if (pass !== confirm) {
      alert("Mật khẩu không khớp");
      return;
    }

    let info =
      "Họ tên: " +
      document.getElementById("hoten").value +
      "<br>" +
      "Ngày sinh: " +
      document.getElementById("ngaysinh").value +
      "<br>" +
      "Giới tính: " +
      document.getElementById("gioitinh").value +
      "<br>" +
      "Email: " +
      document.getElementById("email").value;

    document.getElementById("confirmInfo").innerHTML = info;
  }

  currentStep++;

  if (currentStep >= steps.length) {
    alert("Đăng ký thành công");
    return;
  }

  showStep();
};

prevBtn.onclick = function () {
  currentStep--;

  showStep();
};
