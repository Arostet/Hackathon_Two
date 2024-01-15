const form = document.forms[0];
const username = document.getElementById("email").value;
const email = form[1].value;
const pass = form[2].value;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(form);
  console.log(username);
  console.log(email);
  console.log(pass);
});
