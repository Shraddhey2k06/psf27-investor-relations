const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxkqfxelvy4P-K4cjvU8mOTXeljbIA_nKh4rKguxYcXdLPEc7WvSsaYIoYYXpm0D4w/exec";

const form = document.getElementById("investorForm");
const submitBtn = document.getElementById("submitBtn");
const successState = document.getElementById("successState");
const errorState = document.getElementById("errorState");
const errorMessage = document.getElementById("errorMessage");
const retryBtn = document.getElementById("retryBtn");

function showFieldError(id, message) {
  const el = document.getElementById(id);
  const error = el?.closest("label")?.querySelector(".error");
  if (error) error.textContent = message || "";
}

function clearErrors() {
  document.querySelectorAll(".error").forEach(e => e.textContent = "");
}

function validPhone(value) {
  return /^[+]?[\d\s()\-]{8,20}$/.test(value.trim());
}

function validate() {
  clearErrors();
  let ok = true;

  const required = [
    ["fullName", "Please enter your full name."],
    ["organisation", "Please enter your organisation / venture / fund name."],
    ["designation", "Please enter your designation / role."],
    ["contact", "Please enter your contact number."],
    ["email", "Please enter your email address."]
  ];

  required.forEach(([id, msg]) => {
    if (!document.getElementById(id).value.trim()) {
      showFieldError(id, msg);
      ok = false;
    }
  });

  const email = document.getElementById("email").value.trim();
  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    showFieldError("email", "Please enter a valid email address.");
    ok = false;
  }

  const phone = document.getElementById("contact").value;
  if (phone && !validPhone(phone)) {
    showFieldError("contact", "Please enter a valid contact number.");
    ok = false;
  }

  const day = document.querySelector('input[name="attendanceDay"]:checked');
  if (!day) {
    document.getElementById("attendanceError").textContent = "Please select your preferred day.";
    ok = false;
  }

  if (!document.getElementById("confirmation").checked) {
    document.getElementById("confirmationError").textContent =
      "Please confirm your participation before submitting.";
    ok = false;
  }

  return ok;
}

function setLoading(loading) {
  submitBtn.disabled = loading;
  submitBtn.classList.toggle("loading", loading);
}

async function submitForm() {
  if (!SCRIPT_URL) throw new Error("Submission URL is not configured.");
  const data = Object.fromEntries(new FormData(form).entries());
  data.submittedAt = new Date().toISOString();
  data.source = "PSF27 Investor Relations Website";

  await fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {"Content-Type": "text/plain;charset=utf-8"},
    body: JSON.stringify(data)
  });
  return data;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validate()) return;

  if (form.website.value.trim() !== "") return;

  setLoading(true);
  errorState.hidden = true;

  try {
    const data = await submitForm();
    document.getElementById("successMessage").textContent =
      `Thank you for your time and for confirming your participation in Pune Startup Fest 2027, ${data.fullName}.`;
    form.hidden = true;
    successState.hidden = false;
    window.scrollTo({top: successState.offsetTop - 80, behavior: "smooth"});
  } catch (err) {
    errorMessage.textContent = err.message || "Please try again.";
    errorState.hidden = false;
  } finally {
    setLoading(false);
  }
});

retryBtn.addEventListener("click", () => {
  errorState.hidden = true;
  window.scrollTo({top: form.offsetTop - 80, behavior: "smooth"});
});
