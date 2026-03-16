let danhSachSV = [];

const hoten = document.getElementById("hoten");
const diem = document.getElementById("diem");
const btnThem = document.getElementById("btnThem");
const tableBody = document.getElementById("tableBody");
const tongSV = document.getElementById("tongSV");
const dtb = document.getElementById("dtb");

function xepLoai(d) {
  if (d >= 8.5) return "Giỏi";
  if (d >= 7) return "Khá";
  if (d >= 5) return "Trung bình";
  return "Yếu";
}

function renderTable() {
  tableBody.innerHTML = "";

  danhSachSV.forEach((sv, index) => {
    let tr = document.createElement("tr");

    if (sv.diem < 5) {
      tr.classList.add("yeu");
    }

    tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${sv.hoten}</td>
        <td>${sv.diem}</td>
        <td>${xepLoai(sv.diem)}</td>
        <td>
            <button data-index="${index}" class="btnXoa">Xóa</button>
        </td>
        `;

    tableBody.appendChild(tr);
  });

  capNhatThongKe();
}

function capNhatThongKe() {
  tongSV.textContent = danhSachSV.length;

  if (danhSachSV.length === 0) {
    dtb.textContent = 0;
    return;
  }

  let tongDiem = danhSachSV.reduce((sum, sv) => sum + sv.diem, 0);

  dtb.textContent = (tongDiem / danhSachSV.length).toFixed(2);
}

function themSinhVien() {
  let ten = hoten.value.trim();
  let d = parseFloat(diem.value);

  if (ten === "") {
    alert("Họ tên không được để trống");
    return;
  }

  if (isNaN(d) || d < 0 || d > 10) {
    alert("Điểm phải từ 0 đến 10");
    return;
  }

  danhSachSV.push({
    hoten: ten,
    diem: d,
  });

  renderTable();

  hoten.value = "";
  diem.value = "";
  hoten.focus();
}

btnThem.addEventListener("click", themSinhVien);

diem.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    themSinhVien();
  }
});

tableBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("btnXoa")) {
    let index = e.target.dataset.index;

    danhSachSV.splice(index, 1);

    renderTable();
  }
});
