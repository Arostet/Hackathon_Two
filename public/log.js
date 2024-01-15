const form = document.forms[0];


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log(username);
  console.log(password);
  let userData = { username, password };
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
        if (data.success = true) {
          console.log('user: ', username);
          localStorage.setItem('username', username);
          console.log(localStorage.getItem('username'))
          window.location.href = "http://localhost:3001/hello";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  sendData();
});
