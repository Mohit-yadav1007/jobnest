const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
}); 

// =============================
// SIGN UP FUNCTIONALITY
// =============================
document.getElementById("signupForm").addEventListener("submit", function(e){
  e.preventDefault();
  let name = document.getElementById("signupName").value.trim();
  let email = document.getElementById("signupEmail").value.trim();
  let password = document.getElementById("signupPassword").value.trim();
  let error = document.getElementById("signupError");

  if(name === ""){
    error.textContent = "Name is required!";
    return;
  }
  if(!email.includes("@")){
    error.textContent = "Please enter a valid email!";
    return;
  }
  if(password.length < 8){
    error.textContent = "Password must be at least 8 characters!";
    return;
  }

  // Save new user in localStorage
  let users = JSON.parse(localStorage.getItem("users")) || {};
  if(users[email]){
    error.textContent = "User already exists, please sign in!";
    return;
  }
  users[email] = { name, password };
  localStorage.setItem("users", JSON.stringify(users));

  error.textContent = "";
  alert("✅ Sign Up Successful! Now please sign in.");
  container.classList.remove("right-panel-active"); // switch to Sign In form
});

// =============================
// SIGN IN FUNCTIONALITY
// =============================
document.getElementById("signinForm").addEventListener("submit", function(e){
  e.preventDefault();
  let email = document.getElementById("signinEmail").value.trim();
  let password = document.getElementById("signinPassword").value.trim();
  let error = document.getElementById("signinError");

  if(!email.includes("@")){
    error.textContent = "Please enter a valid email!";
    return;
  }
  if(password.length < 8){
    error.textContent = "Password must be at least 8 characters!";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};
  if(!users[email]){
    alert("⚠️ No account found. Please Sign Up first.");
    return;
  }
  if(users[email].password !== password){
    error.textContent = "Incorrect password!";
    return;
  }

  // Save login session
  error.textContent = "";
  alert("✅ Sign In Successful!");
  localStorage.setItem("loggedIn", "true"); 
  localStorage.setItem("currentUser", email);

  // If redirected from apply button, go back there
  let redirectTo = localStorage.getItem("redirectAfterLogin");
  if(redirectTo){
    localStorage.removeItem("redirectAfterLogin");
    window.location.href = redirectTo;
  } else {
    window.location.href="index.html";
  }
});

// =============================
// LOGOUT FUNCTIONALITY
// =============================
function logoutUser(){
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("currentUser");
  alert("You have been logged out!");
  window.location.href = "login_page.html";
}
