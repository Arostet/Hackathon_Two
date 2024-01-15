const form = document.forms[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  console.log(username);
  console.log(pass);
  let userData = { username, pass };
  const sendData = async () => {
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  sendData();
});
