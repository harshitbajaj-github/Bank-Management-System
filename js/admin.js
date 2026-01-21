let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
let loans = JSON.parse(localStorage.getItem("loanRequests")) || [];
let fds = JSON.parse(localStorage.getItem("fdRequests")) || [];

let current = JSON.parse(localStorage.getItem("currentAccount"));
if(!current || current.email!=="admin@mybank.com"){
  alert("Admin only");
  location.href="index.html";
}

// RENDER FUNCTIONS
function renderAccounts(){
  let tb="";
  accounts.filter(a=>a.email!=="admin@mybank.com").forEach((a,i)=>{
    tb+=`<tr>
      <td>${i+1}</td>
      <td>${a.accountNo}</td>
      <td>${a.name}</td>
      <td>${a.email}</td>
      <td>₹${a.balance}</td>
      <td>${a.isBlocked?"Blocked":"Active"}</td>
    </tr>`;
  });
  document.getElementById("accTable").innerHTML=tb;
}

function renderLoans(){
  let tb="";
  loans.forEach((l,i)=>{
    tb+=`<tr>
      <td>${i+1}</td>
      <td>${l.accountNo}</td>
      <td>${l.name}</td>
      <td>₹${l.amount}</td>
      <td>${l.status}</td>
      <td>
        ${l.status==="Pending"?
          `<button class="approve" onclick="approveLoan(${i})">Approve</button>
           <button class="reject" onclick="rejectLoan(${i})">Reject</button>`:"-"}
      </td>
    </tr>`;
  });
  document.getElementById("loanTable").innerHTML=tb;
}

function renderFD(){
  let tb="";
  fds.forEach((f,i)=>{
    tb+=`<tr>
      <td>${i+1}</td>
      <td>${f.accountNo}</td>
      <td>${f.name}</td>
      <td>₹${f.amount}</td>
      <td>${f.months}</td>
      <td>${f.status}</td>
      <td>
        ${f.status==="Pending"?
          `<button class="approve" onclick="approveFD(${i})">Approve</button>
           <button class="reject" onclick="rejectFD(${i})">Reject</button>`:"-"}
      </td>
    </tr>`;
  });
  document.getElementById("fdTable").innerHTML=tb;
}

// ACTION FUNCTIONS
function approveLoan(i){
  let loan=loans[i];
  let acc=accounts.find(a=>a.accountNo===loan.accountNo);
  if(acc.isBlocked){ alert("Blocked account"); return; }
  acc.balance+=loan.amount;
  if(!acc.transactions) acc.transactions=[];
  acc.transactions.push({type:"Loan Credit",amount:loan.amount,date:new Date().toLocaleString()});
  loan.status="Approved";
  saveAll();
}

function rejectLoan(i){ loans[i].status="Rejected"; saveAll(); }

function approveFD(i){
  let fd=fds[i];
  let acc=accounts.find(a=>a.accountNo===fd.accountNo);
  if(acc.isBlocked){ alert("Blocked account"); return; }
  if(!acc.transactions) acc.transactions=[];
  acc.transactions.push({type:"FD Created",amount:fd.amount,date:new Date().toLocaleString()});
  fd.status="Approved";
  saveAll();
}

function rejectFD(i){ fds[i].status="Rejected"; saveAll(); }

function saveAll(){
  localStorage.setItem("accounts",JSON.stringify(accounts));
  localStorage.setItem("loanRequests",JSON.stringify(loans));
  localStorage.setItem("fdRequests",JSON.stringify(fds));
  renderAll();
}

function renderAll(){
  renderAccounts();
  renderLoans();
  renderFD();
}

function logout(){
  localStorage.removeItem("currentAccount");
  location.href="index.html";
}

// INITIAL RENDER
renderAll();
