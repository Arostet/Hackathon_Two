// first condition checks if the user is logged in
// if not will redirect to the first page
if (localStorage.length > 0) {
  window.location.href = "http://localhost:3001/hello";
} else {
  const form = document.forms[0];

  //post data to login
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
          if (data.success == true) {

            //set local storage 
            localStorage.setItem("username", username);
            localStorage.setItem("user_id", data.id);
            // redirection to hello page
            window.location.href = "http://localhost:3001/hello";
          } else {
            //render messages about errors
            document.getElementById("error").innerText = data.msg;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    sendData();
  });
}
