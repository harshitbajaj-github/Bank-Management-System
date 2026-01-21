let currentAccount = JSON.parse(localStorage.getItem("currentAccount"));
let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
const historyEl = document.getElementById("history");
const popup = document.getElementById("popupMsg");

if(!currentAccount){
  alert("Please login first");
  location.href="index.html";
}

// SHOW POPUP
function showPopup(msg,color="green"){
  popup.innerText = msg;
  popup.style.background = color;
  popup.style.display="block";
  setTimeout(()=> popup.style.display="none",2000);
}

// RENDER TRANSACTIONS
function renderHistory(acc){
  historyEl.innerHTML = "";
  if(!acc.transactions || acc.transactions.length === 0){
    historyEl.innerHTML = `<tr><td colspan="3">No transactions found</td></tr>`;
    return;
  }

  // Show most recent first
  acc.transactions.slice().reverse().forEach(t=>{
    historyEl.innerHTML += `<tr>
      <td>${t.type}</td>
      <td>${Number(t.amount).toFixed(2)}</td>
      <td>${t.date}</td>
    </tr>`;
  });
}

// SEARCH ACCOUNT
function searchAccount(){
  let accNo = document.getElementById("searchAcc").value.trim();
  let acc = accounts.find(a=>a.accountNo===accNo);
  if(!acc){
    showPopup("Account not found","red");
    return;
  }
  currentAccount = acc;
  localStorage.setItem("currentAccount", JSON.stringify(acc));
  renderHistory(acc);
}

// DOWNLOAD PDF
function downloadPDF(){
  const { jsPDF } = window.jspdf; // correct UMD import
  const pdf = new jsPDF();
  pdf.setFontSize(16);
  pdf.text("Bank Statement",20,20);
  pdf.setFontSize(12);
  pdf.text(`Account: ${currentAccount.accountNo}`,20,30);
  pdf.text(`Name: ${currentAccount.name}`,20,40);
  pdf.text(`Email: ${currentAccount.email}`,20,50);

  let y = 65;
  currentAccount.transactions.slice().reverse().forEach(t=>{
    pdf.text(`${t.type} - ₹${Number(t.amount).toFixed(2)} - ${t.date}`,20,y);
    y+=8;
  });

  pdf.save(`Statement_${currentAccount.accountNo}.pdf`);
}

// LOGOUT
function logout(){
  localStorage.removeItem("currentAccount");
  location.href="index.html";
}

// INITIAL RENDER
renderHistory(currentAccount);
