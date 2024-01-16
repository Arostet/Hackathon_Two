const container = document.getElementById("container");

const getMessages = async () => {
  const response = await fetch("http://localhost:3001/messages");
  const data = response.json();
  console.log(data);
};
getMessages();
// setInterval(getMessages, 5000);

const render = (data) => {
  data.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = ``;
  });
};
