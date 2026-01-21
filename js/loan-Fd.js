
let current = JSON.parse(localStorage.getItem("currentAccount"));
let loanReq = JSON.parse(localStorage.getItem("loanRequests")) || [];
let fdReq = JSON.parse(localStorage.getItem("fdRequests")) || [];

if(!current){
 alert("Login first");
 location.href="index.html";
}

/* APPLY LOAN */
function applyLoan(){
 let amt=Number(loanAmt.value);
 let months=loanMonths.value;
 if(amt<=0||!months) return alert("Invalid details");

 loanReq.push({
  accountNo:current.accountNo,
  name:current.name,
  amount:amt,
  months,
  status:"Pending"
 });

 localStorage.setItem("loanRequests",JSON.stringify(loanReq));
 loanAmt.value=""; loanMonths.value="";
 render();
}

/* APPLY FD */
function applyFD(){
 let amt=Number(fdAmt.value);
 let months=fdMonths.value;
 if(amt<=0||!months) return alert("Invalid details");
 if(amt>current.balance) return alert("Low balance");

 fdReq.push({
  accountNo:current.accountNo,
  name:current.name,
  amount:amt,
  months,
  status:"Pending"
 });

 localStorage.setItem("fdRequests",JSON.stringify(fdReq));
 fdAmt.value=""; fdMonths.value="";
 render();
}

/* SHOW USER RECORDS */
function render(){
 let html="";
 loanReq.filter(l=>l.accountNo===current.accountNo).forEach(l=>{
  html+=`<tr><td>Loan</td><td>₹${l.amount}</td><td>${l.months}</td><td>${l.status}</td></tr>`;
 });
 fdReq.filter(f=>f.accountNo===current.accountNo).forEach(f=>{
  html+=`<tr><td>FD</td><td>₹${f.amount}</td><td>${f.months}</td><td>${f.status}</td></tr>`;
 });
 myRecords.innerHTML=html || `<tr><td colspan="4">No records</td></tr>`;
}

function logout(){
 localStorage.removeItem("currentAccount");
}

render();

