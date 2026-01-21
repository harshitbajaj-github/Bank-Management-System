let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
let currentAccount = JSON.parse(localStorage.getItem("currentAccount"));
const popup = document.getElementById("popupMsg");
const recipientNameDiv = document.getElementById("recipientName");

if(!currentAccount){
  alert("Please login first");
  location.href="index.html";
}

// 🔴 BLOCK CHECK (SENDER)
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

// SHOW RECIPIENT NAME
toAccount.addEventListener("input", function(){
  const accNo = this.value.trim();
  recipientNameDiv.innerText="";
  const recipient = accounts.find(a => a.accountNo === accNo);
  if(recipient){
    recipientNameDiv.innerText = `Recipient Name: ${recipient.name}`;
  }
});

// TRANSFER
function transfer(){
  const toAccNo = toAccount.value.trim();
  const amt = Number(amount.value);

  if(toAccNo === "" || amt <= 0){
    showPopup("Invalid details","red"); return;
  }

  if(toAccNo === currentAccount.accountNo){
    showPopup("Cannot transfer to own account","red"); return;
  }

  const receiver = accounts.find(a => a.accountNo === toAccNo);
  if(!receiver){
    showPopup("Recipient not found","red"); return;
  }

  // 🔴 BLOCK CHECK (RECEIVER)
  if(receiver.isBlocked){
    showPopup("Recipient account is blocked","red"); return;
  }

  if(amt > currentAccount.balance){
    showPopup("Insufficient balance","red"); return;
  }

  // SENDER
  currentAccount.balance -= amt;
  currentAccount.transactions.push({
    type:`Transfer to ${receiver.accountNo}`,
    amount:amt,
    date:new Date().toLocaleString()
  });

  // RECEIVER
  receiver.balance += amt;
  receiver.transactions.push({
    type:`Received from ${currentAccount.accountNo}`,
    amount:amt,
    date:new Date().toLocaleString()
  });

  // SAVE ACCOUNTS
  accounts = accounts.map(a =>
    a.accountNo === currentAccount.accountNo ? currentAccount :
    a.accountNo === receiver.accountNo ? receiver : a
  );
  localStorage.setItem("accounts",JSON.stringify(accounts));
  localStorage.setItem("currentAccount",JSON.stringify(currentAccount));

  // ✅ SAVE RECEIPT DATA
  localStorage.setItem("lastTransaction", JSON.stringify({
    txId: "TXN" + Date.now(),
    fromAcc: currentAccount.accountNo,
    toAcc: receiver.accountNo,
    sender: currentAccount.name,
    receiver: receiver.name,
    amount: amt.toFixed(2),
    date: new Date().toLocaleString()
  }));

  showPopup(`₹${amt.toFixed(2)} sent to ${receiver.name}`);

  // ✅ OPEN RECEIPT PAGE
  setTimeout(()=>{
    location.href="receipt.html";
  },1000);
}

// LOGOUT
function logout(){
  localStorage.removeItem("currentAccount");
  location.href="index.html";
}

