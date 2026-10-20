# LEGACY-NOTES.md (Lab 05, Part A)

## Native equivalents of six jQuery calls

| jQuery call | Native JavaScript | Why |
|---|---|---|
| `$(document).ready(fn)` | `<script type="module">` (or `document.addEventListener("DOMContentLoaded", fn)`) | Module scripts are deferred, so they already run after the page is parsed. |
| `$("#name").val()` | `document.querySelector("#name").value` | `.value` is a property of the input element itself. |
| `$("#name").after(html)` | `input.after(node)` with a node made by `document.createElement` | `after()` is built in; passing a created element avoids parsing an HTML string. |
| `$(".error").remove()` | `form.querySelectorAll(".error").forEach((el) => el.remove())` | jQuery loops over every match for you; natively you loop yourself. |
| `$("#status").text(msg).hide().fadeIn(400)` | `status.textContent = msg` (fade dropped, or use a CSS `transition`/`@keyframes`) | There is no one-line native fade; animation belongs in CSS. |
| `$form[0].reset()` | `form.reset()` | `$form` is a jQuery wrapper; `[0]` only unwraps the real form element, which already has `reset()`. |

## Three legacy smells in `legacy-feedback.js`

1. **`var` instead of `const`/`let`.** `var` is function-scoped and hoisted, and it allows re-declaration. Modern code uses `const` by default and `let` when a value changes (like `ok`).
2. **`$.trim(...)` instead of `String.prototype.trim()`.** It was needed before browsers had `.trim()`, and jQuery 4 removed it, so the script would break on an upgrade.
3. **HTML built by string concatenation (`'<span class="error" ...>'`) and `indexOf("@") === -1`.** Hand-written HTML strings are easy to get wrong and unsafe if a user value is ever added into them; `createElement` + `textContent` is safe. `indexOf(...) === -1` is replaced by the clearer `includes("@")`.

(Bonus smell: the whole script needs the jQuery library, an extra network request for something the browser now does itself.)