const form = document.forms[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("email").value;
  const email = form[1].value;
  const pass = form[2].value;
  let userData = { username, email, pass };
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
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  sendData();
});
