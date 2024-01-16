if (localStorage.length === 0) {
  window.location.href = "http://localhost:3001/";
} else {
  function logout() {
    localStorage.clear();
    window.location.href = "http://localhost:3001/";
  }

  const container = document.getElementById("container");

  const form = document.forms[0];
  console.log(form);

  const workoutOptions = document.querySelectorAll(".options");
  var max = 3;
  for (let i = 0; i < workoutOptions.length; i++) {
    workoutOptions[i].addEventListener("click", function (event) {
      if (!checkboxLimit(event)) {
        event.target.checked = false;
        alert("You can select a maximum of 3 options.");
      }
    });
  }
  function checkboxLimit(event) {
    const checkedChecks = document.querySelectorAll(".options:checked");
    if (checkedChecks.length >= max + 1) return false;
    return true;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    form.style = "display: none";
    const pageHead = document.getElementById("pageHead");
    pageHead.style = "display: none";
    const workoutOptions = document.getElementsByClassName("options");
    const allBodyParts = [];
    for (let i = 0; i < workoutOptions.length; i++) {
      if (workoutOptions[i].checked) {
        const bodyPart = workoutOptions[i].id;
        allBodyParts.push(bodyPart);
        console.log(allBodyParts);
        const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=2`;
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "b424837620msh76ab280ad56cb39p1d22d7jsneaf75e21f11e",
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
        };

        try {
          const response = await fetch(url, options);
          const result = await response.json();
          render(result);
        } catch (error) {
          console.error(error);
        }
      }
    }
    const message = 'I started training!'
      sendStstus(message,allBodyParts);
      console.log( 'I sended a message!')
  });

  const render = (data) => {
    data.forEach((item) => {
      const part = item.bodyPart;
      const instr = item.instructions;
      const name = item.name;
      const gif = item.gifUrl;
      const div = document.createElement("div");
      div.textContent = `${name}! This is a workout for your ${part}. ${instr}. `;
      container.appendChild(div);
      const img = document.createElement("img");
      img.src = gif;
      container.appendChild(img);
    });
  };

  const sendStstus = async(message, bodyparts) => {
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

  let messageIsSended = false;

  function endWorkout(){
    messageIsSended = true;
    const message = 'I ended training!';
    const allBodyParts = [];
    sendStstus(message,allBodyParts);
    window.location.href = "http://localhost:3001/hello";
  }
  
  window.addEventListener('beforeunload', function (e) {
    if (messageIsSended = false) {
      const message = 'I ended training!';
      const allBodyParts = [];
      sendStstus(message,allBodyParts); 
    }
  });
}


