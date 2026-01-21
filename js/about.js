function logout(){
  localStorage.removeItem("currentAccount");
  location.href="index.html";
}
