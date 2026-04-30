document.addEventListener("DOMContentLoaded", () => {

  const tabs = document.querySelectorAll(".tab");
  const sections = document.querySelectorAll(".section");
  const topBar = document.querySelector(".top-bar");

  const modal = document.querySelector(".product-modal");
  const overlay = document.querySelector(".overlay");

  const modalImage = document.getElementById("modalImage");
  const modalName = document.getElementById("modalName");
  const modalDescription = document.getElementById("modalDescription");
  const modalPrice = document.getElementById("modalPrice");

  let currentActive = "";

  // ===============================
  // TABS CLICK
  // ===============================
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = document.getElementById(tab.dataset.target);
      const offset = topBar.offsetHeight + 20;

      const topPosition =
        target.getBoundingClientRect().top +
        window.pageYOffset - offset;

      window.scrollTo({
        top: topPosition,
        behavior: "smooth"
      });
    });
  });

  // ===============================
  // SCROLL SPY
  // ===============================
  window.addEventListener("scroll", () => {

    sections.forEach(section => {

      const sectionTop =
        section.offsetTop - topBar.offsetHeight - 60;

      const sectionBottom =
        sectionTop + section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionBottom
      ) {
        currentActive = section.id;
      }
    });

    tabs.forEach(tab => {
      tab.classList.remove("active");

      if (tab.dataset.target === currentActive) {
        tab.classList.add("active");

        const tabsContainer = document.querySelector(".tabs");
        const tabLeft = tab.offsetLeft - (tabsContainer.offsetWidth / 2) + (tab.offsetWidth / 2);

        tabsContainer.scrollTo({
          left: tabLeft,
          behavior: "smooth"
        });
      }
    });

  });

  // ===============================
  // ABRIR MODAL (INFO)
  // ===============================
  document.querySelectorAll(".add-btn").forEach(button => {

    button.addEventListener("click", e => {

      const item = e.target.closest(".item");

      modalImage.src = item.dataset.image;
      modalName.textContent = item.dataset.name;
      modalDescription.textContent = item.dataset.description;
      modalPrice.textContent = `$${item.dataset.price} MXN`;

      modal.classList.add("active");
      overlay.classList.add("active");

    });

  });

  // ===============================
  // CERRAR MODAL
  // ===============================
  overlay.addEventListener("click", closeModal);
  document.querySelector(".close-modal")
    .addEventListener("click", closeModal);

  function closeModal() {
    modal.classList.remove("active");
    overlay.classList.remove("active");
  }

});