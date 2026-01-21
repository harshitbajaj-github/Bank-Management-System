const popup = document.getElementById("popupMsg");

function showPopup(msg,color="red"){
  popup.innerText = msg;
  popup.style.background = color;
  popup.style.display="block";
  setTimeout(()=> popup.style.display="none",2000);
}

// LOGIN FORM
document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  // ADMIN LOGIN
  if(email === "admin@mybank.com" && password === "admin123"){
    let admin = accounts.find(a => a.email === email);

    if(!admin){
      admin = {
        accountNo:"ADMIN001",
        name:"Admin",
        email:"admin@mybank.com",
        password:"admin123",
        balance:0,
        transactions:[]
      };
      accounts.push(admin);
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }

    localStorage.setItem("currentAccount", JSON.stringify(admin));
    showPopup("Admin login successful","green");
    setTimeout(()=> location.href="admin.html",1000);
    return;
  }

  // NORMAL USER LOGIN
  const user = accounts.find(a => a.email === email && a.password === password);

  if(user){
    if(!user.transactions) user.transactions = []; // safe check
    localStorage.setItem("currentAccount", JSON.stringify(user));
    showPopup("Login successful","green");
    setTimeout(()=> location.href="dashboard.html",1000);
  }else{
    showPopup("Invalid email or password","red");
  }
});
