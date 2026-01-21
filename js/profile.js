
let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
let currentAccount = JSON.parse(localStorage.getItem("currentAccount"));
const popup = document.getElementById("popupMsg");

if(!currentAccount){
  alert("Please login first");
  location.href="index.html";
}

function showPopup(msg,color="green"){
  popup.innerText = msg;
  popup.style.background = color;
  popup.style.display="block";
  popup.style.opacity="1";
  setTimeout(()=>{
    popup.style.opacity="0";
    setTimeout(()=> popup.style.display="none",500);
  },2000);
}

function renderProfile(){
  document.getElementById("accName").innerText = currentAccount.name;
  document.getElementById("accNo").innerText = currentAccount.accountNo;
  document.getElementById("accEmail").innerText = currentAccount.email;
  document.getElementById("accBalance").innerText = currentAccount.balance.toFixed(2);

  const historyEl = document.getElementById("history");
  historyEl.innerHTML = "";
  if(!currentAccount.transactions || currentAccount.transactions.length===0){
    historyEl.innerHTML = `<tr><td colspan="3">No transactions found</td></tr>`;
    return;
  }

  currentAccount.transactions.slice().reverse().forEach(t=>{
    historyEl.innerHTML += `<tr>
      <td>${t.type}</td>
      <td>${Number(t.amount).toFixed(2)}</td>
      <td>${t.date}</td>
    </tr>`;
  });
}

function deposit(){
  const amt = Number(document.getElementById("amount").value);
  if(amt<=0){ showPopup("Invalid amount","red"); return; }
  currentAccount.balance += amt;
  currentAccount.transactions.push({type:"Deposit",amount:amt,date:new Date().toLocaleString()});
  saveChanges();
  showPopup(`₹${amt.toFixed(2)} deposited successfully`);
}

function withdraw(){
  const amt = Number(document.getElementById("amount").value);
  if(amt<=0){ showPopup("Invalid amount","red"); return; }
  if(amt>currentAccount.balance){ showPopup("Insufficient balance","red"); return; }
  currentAccount.balance -= amt;
  currentAccount.transactions.push({type:"Withdraw",amount:amt,date:new Date().toLocaleString()});
  saveChanges();
  showPopup(`₹${amt.toFixed(2)} withdrawn successfully`);
}

function saveChanges(){
  accounts = accounts.map(a=> a.accountNo===currentAccount.accountNo ? currentAccount : a);
  localStorage.setItem("accounts", JSON.stringify(accounts));
  localStorage.setItem("currentAccount", JSON.stringify(currentAccount));
  document.getElementById("amount").value="";
  renderProfile();
}

function logout(){
  localStorage.removeItem("currentAccount");
  location.href="index.html";
}

renderProfile();
