
function logout(){
  localStorage.removeItem("currentAccount");
  location.href="index.html";
}

// Dummy contact form submit
document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();
  alert("Thank you! Your message has been sent.");
  this.reset();
});

