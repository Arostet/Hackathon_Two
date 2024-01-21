// first condition checks if the user is logged in
// if not will redirect to the first page
if (localStorage.length === 0) {
  window.location.href = "http://localhost:3001/";
} else {
  // button logout clears local storage and redirects to the first page
  function logout() {
    localStorage.clear();
    window.location.href = "http://localhost:3001/";
  }

  // variable that stores data if the user started or finished the workout
  // (for sending message about starting or finishing to the community)
  let notTrainingNow = true;

  const container = document.getElementById("container");

  const form = document.forms[0];
  //make sure that only 3 options can be checked for each workout
  const workoutOptions = document.querySelectorAll(".options");
  let max = 3;
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

  //big function, runned by button 'submit', after 3 bodyparts were selected
  //creates workout based on checked boxes (fetches from API end renders)
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // hides form with bodyparts
    form.style = "display: none";
    const pageHead = document.getElementById("pageHead");
    pageHead.style = "display: none";

    const workoutOptions = document.getElementsByClassName("options");
    //will save all rendered bodyparts for a message about beginning of training 
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


    // changes a status, sendes a message to community
    notTrainingNow = false;
    console.log ('notTrainingNow', notTrainingNow, 'started training');
    const message = "I started training!";
    sendStstus(message, allBodyParts);

    // addes button for ending workout
    const buttonEnd_HTML =
      '<button id="end" onclick="endWorkout()">End workout</button>';
    container.innerHTML += buttonEnd_HTML;
  });


  //render workout in html
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

  //post new message about workout
  const sendStstus = async (message, bodyparts) => {
    const id = localStorage.getItem("user_id");
    // 0 means that message not direct, for all comunity
    const to_user = 0;
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

  //finish training message
  function endWorkout() {
    //changes a status 
    notTrainingNow = true;
    console.log ('notTrainingNow', notTrainingNow, 'ended training');
     //sends a message about ending a training;
    const message = "I ended training!";
    // new variable allBodyParts, just inside a function 
    // because we dont neeed to send bodyparts in this message
    const allBodyParts = [];
    sendStstus(message, allBodyParts);
    //redirects to the hello page
    window.location.href = "http://localhost:3001/hello";
  }

  //finish training if user leaves the page
  window.addEventListener("beforeunload", function (e) {
    // checks a status (for preventind double message about ending)
    if ((notTrainingNow == false)) {
      //sends a message about ending a training
      const message = "I ended training!";
      const allBodyParts = [];
      sendStstus(message, allBodyParts);
    }
  });
}
