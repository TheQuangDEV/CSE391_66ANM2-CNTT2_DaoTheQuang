let students = [];
let filteredStudents = [];

let sortAsc = true;

const hoten = document.getElementById("hoten");
const diem = document.getElementById("diem");
const btnThem = document.getElementById("btnThem");

const search = document.getElementById("search");
const filter = document.getElementById("filter");

const tableBody = document.getElementById("tableBody");
const noResult = document.getElementById("noResult");

const tongSV = document.getElementById("tongSV");
const dtb = document.getElementById("dtb");

const sortScore = document.getElementById("sortScore");
const arrow = document.getElementById("arrow");

function xepLoai(d) {
  if (d >= 8.5) return "Giỏi";
  if (d >= 7) return "Khá";
  if (d >= 5) return "Trung bình";
  return "Yếu";
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

  students.push({
    hoten: ten,
    diem: d,
  });

  hoten.value = "";
  diem.value = "";
  hoten.focus();

  applyFilters();
}

btnThem.addEventListener("click", themSinhVien);

diem.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    themSinhVien();
  }
});

function applyFilters() {
  let keyword = search.value.toLowerCase();
  let loai = filter.value;

  filteredStudents = students.filter((sv) => {
    let matchName = sv.hoten.toLowerCase().includes(keyword);

    let matchLoai = loai === "all" || xepLoai(sv.diem) === loai;

    return matchName && matchLoai;
  });

  filteredStudents.sort((a, b) => {
    return sortAsc ? a.diem - b.diem : b.diem - a.diem;
  });

  renderTable();
}

function renderTable() {
  tableBody.innerHTML = "";

  if (filteredStudents.length === 0) {
    noResult.style.display = "block";
  } else {
    noResult.style.display = "none";
  }

  filteredStudents.forEach((sv, index) => {
    let tr = document.createElement("tr");

    if (sv.diem < 5) {
      tr.classList.add("yeu");
    }

    let realIndex = students.indexOf(sv);

    tr.innerHTML = `
<td>${index + 1}</td>
<td>${sv.hoten}</td>
<td>${sv.diem}</td>
<td>${xepLoai(sv.diem)}</td>
<td>
<button data-index="${realIndex}" class="deleteBtn">Xóa</button>
</td>
`;

    tableBody.appendChild(tr);
  });

  capNhatThongKe();
}

function capNhatThongKe() {
  tongSV.textContent = students.length;

  if (students.length === 0) {
    dtb.textContent = 0;
    return;
  }

  let tong = students.reduce((sum, sv) => sum + sv.diem, 0);

  dtb.textContent = (tong / students.length).toFixed(2);
}

tableBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("deleteBtn")) {
    let index = e.target.dataset.index;

    students.splice(index, 1);

    applyFilters();
  }
});

search.addEventListener("input", applyFilters);

filter.addEventListener("change", applyFilters);

sortScore.addEventListener("click", function () {
  sortAsc = !sortAsc;

  arrow.textContent = sortAsc ? "▲" : "▼";

  applyFilters();
});
