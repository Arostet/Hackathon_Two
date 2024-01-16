if (localStorage.length === 0) {
  window.location.href = "http://localhost:3001/";
} else {
  function logout() {
    localStorage.clear();
    window.location.href = "http://localhost:3001/";
  }
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
