
// ===== LOGOUT FUNCTION =====
function logout(){
  localStorage.removeItem("currentAccount");
  location.href="index.html";
}

// ===== BANK LOGIC =====
let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

function createAccount(name, email, password, balance){
  // Check if email already exists
  if(accounts.find(a => a.email === email)){
    showPopup("Email already registered!", "red");
    return;
  }

  let acc = {
    accountNo: Date.now().toString(),
    name: name,
    email: email,
    password: password,
    balance: Number(balance),
    transactions: [
      {
        type:"Deposit",
        amount: Number(balance),
        date: new Date().toLocaleString()
      }
    ]
  };

  accounts.push(acc);
  localStorage.setItem("accounts", JSON.stringify(accounts));
  localStorage.setItem("currentAccount", JSON.stringify(acc));
}

// POPUP FUNCTION
const popup = document.getElementById("popupMsg");
function showPopup(message, color){
  popup.innerText = message;
  popup.style.background = color;
  popup.style.display = "block";
  popup.style.opacity = "1";

  setTimeout(()=>{
    popup.style.opacity = "0";
    setTimeout(()=> popup.style.display="none",500);
  },2000);
}

// FORM SUBMIT
const form = document.getElementById("registerForm");
form.addEventListener("submit", function(e){
  e.preventDefault();

  const fullName = document.getElementById("name").value.trim();
  const emailAddr = document.getElementById("email").value.trim();
  const pass = document.getElementById("password").value;
  const balanceAmt = document.getElementById("balance").value;

  if(balanceAmt < 500){
    showPopup("Minimum opening balance is ₹500", "red");
    return;
  }

  createAccount(fullName, emailAddr, pass, balanceAmt);
  showPopup("Account created successfully!", "green");

  form.reset();

  setTimeout(()=>{
    window.location.href = "dashboard.html";
  },1500);
});

