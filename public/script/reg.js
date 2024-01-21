// first condition checks if the user is logged in
// if not will redirect to the first page
if (localStorage.length > 0) {
  window.location.href = "http://localhost:3001/hello";
} else {
  const form = document.forms[0];
  //post data to add user
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
            // render messages about errors
            document.getElementById("error").innerText = data.msg;
          } else {
            //set local storage 
            localStorage.setItem("username", username);
            localStorage.setItem("user_id", data[0].id);
            // redirection to hello page
            window.location.href = "http://localhost:3001/hello";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    sendData();
  });
}
