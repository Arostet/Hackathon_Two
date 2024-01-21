//check if user is signed in
if (localStorage.length === 0) {
  window.location.href = "http://localhost:3001/";
} else {
  function logout() {
    localStorage.clear();
    window.location.href = "http://localhost:3001/";
  }

  const container = document.getElementById("container");
  //fetch from our server to get the messages db info for the community forum
  const getMessages = async () => {
    const response = await fetch("http://localhost:3001/messages");
    const data = response.json();
    render(data);
  };
  // fetch from the server every 5 seconds
  setInterval(getMessages, 5000);

  //render the messages data to display in forum
  const render = (data) => {
    data.then((res) => {
      let html = "";
      res.forEach((item) => {
        //if it is a message to all users
        if (item.to_user == null || item.to_user == 0) {
          //in order to not display {}
          if (item.bodyparts.length < 3) {
            html += `    <div><b>${item.username}</b> says ${item.message}.
                  Workout at ${item.time}</div><br>`;
          } else {
            html += `    <div><b>${item.username}</b> says ${item.message}.
                  Workout: <b>${item.bodyparts}</b> at ${item.time}</div><br>`;
          }
        } else if (item.to_user == localStorage.getItem("user_id")) {
          html += `    <div style = "color:red"><b>${item.username}</b> says ${item.message}.
                At ${item.time}</div><br>`;
        }
      });
      container.innerHTML = html;
    });
  };
  //onclick functions to redirect user to proper pages
  function redirectWorkout() {
    window.location.href = "http://localhost:3001/user_page";
  }

  function redirectHello() {
    window.location.href = "http://localhost:3001/hello";
  }

  //front-end post to the server in order to add the message to the db so it can be displayed on forum
  const form = document.forms[0];
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const sendMessage = async () => {
      const bodyparts = [];
      const message = document.getElementById("message").value;
      const id = localStorage.getItem("user_id");
      const to_user = document.getElementById("allUsers").value;
      const newMessage = { id, message, bodyparts, to_user };

      fetch("http://localhost:3001/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    sendMessage();
  });

  const getUserNames = async () => {
    const response = await fetch("http://localhost:3001/users");
    response.json().then((users) => {
      renderUsers(users);
    });
  };
  getUserNames();

  const renderUsers = (users) => {
    let html = "";
    users.forEach((user) => {
      html += `
      <option value = "${user.id}">${user.username}</option>
      `;
    });
    document.getElementById("allUsers").innerHTML += html;
  };
}
