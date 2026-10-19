import { delay, makeCounter } from "./utils.js";

const status = document.querySelector("#status");
const tbody = document.querySelector("#schedule tbody");
const nextBooking = makeCounter();

// One delegated listener for every "Select" button (also works for rows added later)
tbody.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-day]");
  if (!button) return;

  const day = button.dataset.day;
  const row = button.closest("tr");

  button.disabled = true;                       // avoid double clicks while waiting
  status.textContent = `Updating ${day}…`;
  await delay(1000);                            // pauses only this handler

  const nowSelected = row.classList.toggle("selected");
  button.setAttribute("aria-pressed", String(nowSelected));
  button.disabled = false;

  const count = document.querySelectorAll("#schedule tr.selected").length;
  status.textContent = nowSelected
    ? `Booking #${nextBooking()} confirmed for ${day}. ${count} slot(s) booked.`
    : `${day} booking cancelled. ${count} slot(s) booked.`;
});