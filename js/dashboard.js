
let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
let currentAccount = JSON.parse(localStorage.getItem("currentAccount"));
const popup = document.getElementById("popupMsg");

if(!currentAccount){
  alert("Please login first");
  location.href="index.html";
}

/* 🔴 BLOCK CHECK */
if(currentAccount.isBlocked){
  alert("Your account is blocked. Please contact bank.");
  logout();
}

// POPUP
function showPopup(msg,color="green"){
  popup.innerText = msg;
  popup.style.background = color;
  popup.style.display="block";
  setTimeout(()=> popup.style.display="none",2000);
}

// RENDER
function renderDashboard(){
  accNo.innerText = currentAccount.accountNo;
  accName.innerText = currentAccount.name;
  accEmail.innerText = currentAccount.email;
  accBalance.innerText = currentAccount.balance.toFixed(2);

  const history = document.getElementById("history");
  history.innerHTML="";

  if(!currentAccount.transactions || currentAccount.transactions.length===0){
    history.innerHTML = `<tr><td colspan="3">No transactions</td></tr>`;
    return;
  }

  currentAccount.transactions.slice().reverse().forEach(t=>{
    history.innerHTML += `
      <tr>
        <td>${t.type}</td>
        <td>${t.amount.toFixed(2)}</td>
        <td>${t.date}</td>
      </tr>`;
  });
}

// DEPOSIT
function deposit(){
  const amt = Number(amount.value);
  if(amt<=0) return showPopup("Invalid amount","red");
  currentAccount.balance += amt;
  currentAccount.transactions.push({
    type:"Deposit",
    amount:amt,
    date:new Date().toLocaleString()
  });
  save();
  showPopup("Amount deposited");
}

// WITHDRAW
function withdraw(){
  const amt = Number(amount.value);
  if(amt<=0) return showPopup("Invalid amount","red");
  if(amt>currentAccount.balance) return showPopup("Insufficient balance","red");
  currentAccount.balance -= amt;
  currentAccount.transactions.push({
    type:"Withdraw",
    amount:amt,
    date:new Date().toLocaleString()
  });
  save();
  showPopup("Amount withdrawn");
}

// SAVE
function save(){
  accounts = accounts.map(a=>a.accountNo===currentAccount.accountNo?currentAccount:a);
  localStorage.setItem("accounts",JSON.stringify(accounts));
  localStorage.setItem("currentAccount",JSON.stringify(currentAccount));
  amount.value="";
  renderDashboard();
}

// LOGOUT
function logout(){
  localStorage.removeItem("currentAccount");
  location.href="index.html";
}

renderDashboard();

