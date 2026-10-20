import { delay, makeCounter, getRequired, describeSlot, type Slot } from "./utils.js";

// Same three slots as the rows in the table
const slots: Slot[] = [
  { day: "Monday", start: "10:00", end: "11:00", room: "Room 214" },
  { day: "Wednesday", start: "12:00", end: "13:00", room: "Room 214" },
  { day: "Friday", start: "14:00", end: "15:00", room: "Room 214" },
];

const status = getRequired<HTMLParagraphElement>("#status");
const tbody = getRequired<HTMLTableSectionElement>("#schedule tbody");
const nextBooking = makeCounter();

tbody.addEventListener("click", async (event: MouseEvent) => {
  // event.target is EventTarget | null -> prove it is an Element
  const target = event.target;
  if (!(target instanceof Element)) return;

  // closest() may return null
  const button = target.closest<HTMLButtonElement>("button[data-day]");
  const row = target.closest("tr");
  if (button === null || row === null) return;

  // find() may return undefined
  const slot = slots.find((s) => s.day === button.dataset.day);
  if (slot === undefined) return;

  button.disabled = true; // avoid double clicks while waiting
  status.textContent = `Updating ${slot.day}…`;
  await delay(1000);

  const booked = row.classList.toggle("selected");
  button.setAttribute("aria-pressed", String(booked));
  button.disabled = false;

  const count = document.querySelectorAll("#schedule tr.selected").length;
  status.textContent = booked
    ? `Booking #${nextBooking()} confirmed: ${describeSlot(slot)}. ${count} of ${slots.length} slots booked.`
    : `Booking for ${slot.day} cancelled. ${count} of ${slots.length} slots booked.`;
});
  