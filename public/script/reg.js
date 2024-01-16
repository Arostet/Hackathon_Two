const form = document.forms[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = form[0].value;
  const username = form[1].value;
  const password = form[2].value;
 
  let userData = { username, password, email };
  
  const sendData = async () => {
    fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {

        if (data.msg) {
          document.getElementById('error').innerText = data.msg;

        } else {
          localStorage.setItem('username', data.username);
          window.location.href = "http://localhost:3001/hello";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  sendData();
});