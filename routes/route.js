const express = require("express");
const router = express.Router();
const { getExercise } = require();

router.get("/api", getExercise);
