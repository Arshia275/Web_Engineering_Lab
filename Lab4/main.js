
import { delay, makeCounter } from "./utils.js";

const nextConfirmationNumber = makeCounter();

const bookingStatus = document.querySelector("#booking-status");
const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

/* TASK 10 and 11: One delegated booking click listener */
document.addEventListener("click", async function (event) {
    const button = event.target.closest(".book-button");

    if (!button || !event.currentTarget.contains(button)) {
        return;
    }

  
    button.classList.toggle("selected");

    
    const selected = button.classList.contains("selected");
    button.setAttribute("aria-pressed", String(selected));

    // Count selected booking buttons
    const count = document.querySelectorAll(
        ".book-button.selected"
    ).length;

    bookingStatus.textContent =
        `${count} session${count === 1 ? "" : "s"} selected.`;

    // Wait asynchronously before confirming
    if (selected) {
        const confirmationNumber = nextConfirmationNumber();
        const day = button.dataset.day;

        await delay(500);

        if (button.classList.contains("selected")) {
            bookingStatus.textContent =
                `Confirmation #${confirmationNumber}: ${day} session selected. ` +
                `${document.querySelectorAll(".book-button.selected").length} ` +
                `session(s) currently selected.`;
        }
    }
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    formStatus.textContent =
        "Your form has been validated. This demo does not send data to a server.";
});
