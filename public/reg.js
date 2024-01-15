const form = document.forms[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = form[0].value;
  console.log('email',email);
  const username = form[1].value;
  console.log('username',username);
  const password = form[2].value;
  console.log('password',password);
  let userData = { username, password, email };
  console.log(userData);
  console.log(JSON.stringify(userData));
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
        console.log('user: ',data.username);
        localStorage.setItem('username', data.username);
        window.location.href = "http://localhost:3001/hello";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  sendData();
});
