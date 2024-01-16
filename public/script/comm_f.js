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
      html += `    <div>${item.username} says ${item.message}.</div>
        <div> Workout: ${item.bodyparts} at ${item.time}</div>`;
    });
    container.innerHTML = html;
  });
};
