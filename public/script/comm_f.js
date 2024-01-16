if (localStorage.length === 0) {
  window.location.href = "http://localhost:3001/";
} else {
  function logout() {
    localStorage.clear();
    window.location.href = "http://localhost:3001/";
  }


const container = document.getElementById("container");

const getMessages = async () => {
  const response = await fetch("http://localhost:3001/messages");
  const data = response.json();
  render(data);
};
// getMessages();
setInterval(getMessages, 5000);

const render = (data) => {
  data.then((res) => {
    let html = "";
    res.forEach((item) => {
      if (item.bodyparts.length < 3) {
        html += `    <div><b>${item.username}</b> says ${item.message}.
                Workout at ${item.time}</div><br>`;
      } else {
        html += `    <div><b>${item.username}</b> says ${item.message}.
                Workout: <b>${item.bodyparts}</b> at ${item.time}</div><br>`;
      }
    });
    container.innerHTML = html;
  });
};

function redirectWorkout() {
  window.location.href = "http://localhost:3001/user_page";
}

function redirectHello() {
  window.location.href = "http://localhost:3001/hello";
}



const sendStstus = async(message) => {
  const bodyparts = [];
  const id = localStorage.getItem('user_id');
  console.log(id);
  const newMessage = {id, message, bodyparts};
  console.log(newMessage);
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

}