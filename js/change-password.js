let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
let currentAccount = JSON.parse(localStorage.getItem("currentAccount"));
const popup = document.getElementById("popupMsg");

if(!currentAccount){
  alert("Please login first");
  location.href="index.html";
}

function showPopup(msg,color="red"){
  popup.innerText = msg;
  popup.style.background = color;
  popup.style.display="block";
  setTimeout(()=> popup.style.display="none",2000);
}

// FORM SUBMIT
document.getElementById("changeForm").addEventListener("submit", function(e){
  e.preventDefault();

  const oldPass = document.getElementById("oldPass").value;
  const newPass = document.getElementById("newPass").value;
  const confirmPass = document.getElementById("confirmPass").value;

  // Validate old password
  if(oldPass !== currentAccount.password){
    showPopup("Old password is incorrect","red");
    return;
  }

  // Validate new password match
  if(newPass !== confirmPass){
    showPopup("New passwords do not match","red");
    return;
  }

  // Update password
  currentAccount.password = newPass;
  accounts = accounts.map(a => a.accountNo === currentAccount.accountNo ? currentAccount : a);
  localStorage.setItem("accounts", JSON.stringify(accounts));
  localStorage.setItem("currentAccount", JSON.stringify(currentAccount));

  showPopup("Password updated successfully","green");

  // Reset form
  document.getElementById("changeForm").reset();
});

// LOGOUT
function logout(){
  localStorage.removeItem("currentAccount");
  location.href="index.html";
}
