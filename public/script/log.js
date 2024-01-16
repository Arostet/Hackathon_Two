const form = document.forms[0];


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
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
        // console.log(data);
        if (data.success == true) {
          // console.log(data.id);
          localStorage.setItem('username', username);
          localStorage.setItem('user_id', data.id);
          window.location.href = "http://localhost:3001/hello";

        } else {
          document.getElementById('error').innerText = data.msg;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  sendData();
});
