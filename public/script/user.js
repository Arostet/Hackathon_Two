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
    for (let i = 0; i < workoutOptions.length; i++) {
      if (workoutOptions[i].checked) {
        const bodyPart = workoutOptions[i].id;
        console.log(bodyPart);
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
}
