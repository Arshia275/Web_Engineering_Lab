import { greet } from "./greet.js";

const heading = document.getElementById("greeting");
heading.textContent = greet("World");