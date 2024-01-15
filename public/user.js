const container = document.getElementById("container");

const url = "https://exercisedb.p.rapidapi.com/exercises/bodyPartList";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b424837620msh76ab280ad56cb39p1d22d7jsneaf75e21f11e",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};
const getBodyparts = async () => {
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
getBodyparts();
