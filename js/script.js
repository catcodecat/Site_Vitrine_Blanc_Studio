const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuButton.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.18 },
);

revealElements.forEach((element) => observer.observe(element));

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

function showMessage(text, isError = false) {
  formMessage.textContent = text;
  formMessage.hidden = false;
  formMessage.classList.toggle("error", isError);
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const privacy = formData.get("privacy");

  if (!name) {
    showMessage("Le nom est obligatoire.", true);
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showMessage("L'adresse email doit être valide.", true);
    return;
  }

  if (!message) {
    showMessage("Le message est obligatoire.", true);
    return;
  }

  if (!privacy) {
    showMessage("Vous devez accepter la politique de confidentialité.", true);
    return;
  }

  const savedRequests = JSON.parse(localStorage.getItem("blancStudioRequests") || "[]");
  savedRequests.push({
    name,
    email,
    phone: formData.get("phone"),
    projectType: formData.get("projectType"),
    message,
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem("blancStudioRequests", JSON.stringify(savedRequests));

  contactForm.reset();
  showMessage("Votre demande a bien été enregistrée. Blanc Studio vous répondra prochainement.");
});
