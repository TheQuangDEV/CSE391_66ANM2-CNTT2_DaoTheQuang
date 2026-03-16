const prices = {
"Áo":150000,
"Quần":200000,
"Giày":500000,
"Mũ":100000
}

const product = document.getElementById("product")
const quantity = document.getElementById("quantity")
const date = document.getElementById("deliveryDate")
const address = document.getElementById("address")
const note = document.getElementById("note")

const charCount = document.getElementById("charCount")
const totalPrice = document.getElementById("totalPrice")

const confirmBox = document.getElementById("confirmBox")
const orderSummary = document.getElementById("orderSummary")

const form = document.getElementById("orderForm")

function showError(id,msg){
document.getElementById(id+"Error").textContent = msg
}

function clearError(id){
document.getElementById(id+"Error").textContent = ""
}

function validateProduct(){
if(product.value===""){
showError("product","Chọn sản phẩm")
return false
}
clearError("product")
return true
}

function validateQuantity(){

let q = Number(quantity.value)

if(!Number.isInteger(q) || q<1 || q>99){
showError("quantity","Số lượng 1-99")
return false
}

clearError("quantity")
return true
}

function validateDate(){

let selected = new Date(date.value)
let today = new Date()

today.setHours(0,0,0,0)

let max = new Date()
max.setDate(today.getDate()+30)

if(date.value===""){
showError("date","Chọn ngày giao")
return false
}

if(selected < today){
showError("date","Không chọn ngày quá khứ")
return false
}

if(selected > max){
showError("date","Không quá 30 ngày")
return false
}

clearError("date")
return true
}

function validateAddress(){

if(address.value.trim().length < 10){
showError("address","Ít nhất 10 ký tự")
return false
}

clearError("address")
return true
}

function validateNote(){

if(note.value.length>200){
showError("note","Tối đa 200 ký tự")
return false
}

clearError("note")
return true
}

function validatePayment(){

let pay = document.querySelector('input[name="payment"]:checked')

if(!pay){
showError("payment","Chọn phương thức")
return false
}

clearError("payment")
return true
}

note.addEventListener("input",function(){

let len = note.value.length

charCount.textContent = len + "/200"

if(len>200){
charCount.style.color="red"
}else{
charCount.style.color="black"
}

})

function updateTotal(){

let sp = product.value
let q = Number(quantity.value)

if(sp && q){
let total = prices[sp]*q
totalPrice.textContent = total.toLocaleString("vi-VN")
}

}

product.addEventListener("change",updateTotal)
quantity.addEventListener("input",updateTotal)

form.addEventListener("submit",function(e){

e.preventDefault()

let valid =
validateProduct() &
validateQuantity() &
validateDate() &
validateAddress() &
validateNote() &
validatePayment()

if(valid){

let sp = product.value
let q = quantity.value
let price = prices[sp]*q

orderSummary.innerHTML =
`
Sản phẩm: ${sp}<br>
Số lượng: ${q}<br>
Tổng tiền: ${price.toLocaleString("vi-VN")} VNĐ<br>
Ngày giao: ${date.value}
`

confirmBox.style.display="block"

}

})

document.getElementById("confirmBtn").onclick = function(){

confirmBox.style.display="none"

form.style.display="none"

document.getElementById("success").innerHTML =
"Đặt hàng thành công 🎉"

}

document.getElementById("cancelBtn").onclick = function(){

confirmBox.style.display="none"

}