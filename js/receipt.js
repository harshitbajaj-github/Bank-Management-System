const receipt = JSON.parse(localStorage.getItem("lastTransaction"));

if(!receipt){
  alert("No transaction found");
  location.href="dashboard.html";
}

document.getElementById("txId").innerText = receipt.txId;
document.getElementById("fromAcc").innerText = receipt.from;
document.getElementById("toAcc").innerText = receipt.to;
document.getElementById("amount").innerText = receipt.amount;
document.getElementById("date").innerText = receipt.date;

function goHome(){
  localStorage.removeItem("lastTransaction");
  location.href="dashboard.html";
}
