/* ============================================================
   Nicholas Huang — Portfolio interactions
   Vanilla JS, no dependencies.
   ============================================================ */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Footer year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Nav: scrolled state + reading progress ---------- */
  const nav = $("#nav");
  const progressBar = $("#progressBar");

  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle("is-scrolled", y > 24);

    if (progressBar) {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? (y / docH) * 100 : 0;
      progressBar.style.width = pct + "%";
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const toggle = $("#navToggle");
  const menu = $("#mobileMenu");

  const setMenu = (open) => {
    if (!menu || !toggle || !nav) return;
    menu.classList.toggle("is-open", open);
    nav.classList.toggle("menu-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("no-scroll", open);
  };

  if (toggle) {
    toggle.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  }
  if (menu) {
    $$(".menu__link", menu).forEach((link) =>
      link.addEventListener("click", () => setMenu(false))
    );
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = $$(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => revObserver.observe(el));
  }

  /* ---------- Scrollspy: highlight active nav link ---------- */
  const sections = ["work", "about", "services", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const navLinks = $$(".nav__link");

  if (sections.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((l) =>
              l.classList.toggle("is-active", l.getAttribute("href") === "#" + id)
            );
          }
        });
      },
      { threshold: 0.4, rootMargin: "-30% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Lightbox ---------- */
  const lightbox = $("#lightbox");
  const lbImg = $("#lightboxImg");
  const lbTitle = $("#lightboxTitle");
  const lbCat = $("#lightboxCat");
  const lbDesc = $("#lightboxDesc");
  const lbYear = $("#lightboxYear");
  const lbClose = $("#lightboxClose");
  let lastFocused = null;

  const openLightbox = (card) => {
    if (!lightbox) return;
    lastFocused = card;
    lbImg.src = card.dataset.src || card.querySelector("img")?.src || "";
    lbImg.alt = card.dataset.title || "";
    lbTitle.textContent = card.dataset.title || "";
    lbCat.textContent = card.dataset.cat || "";
    lbDesc.textContent = card.dataset.desc || "";
    lbYear.textContent = card.dataset.year ? "Year — " + card.dataset.year : "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    lbClose?.focus();
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    if (lastFocused) lastFocused.focus();
  };

  $$(".card").forEach((card) => {
    card.addEventListener("click", () => openLightbox(card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(card);
      }
    });
  });

  if (lightbox) {
    lbClose?.addEventListener("click", closeLightbox);
    $$("[data-close]", lightbox).forEach((el) =>
      el.addEventListener("click", closeLightbox)
    );
  }

  /* ---------- Global keyboard ---------- */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (lightbox?.classList.contains("is-open")) closeLightbox();
      if (menu?.classList.contains("is-open")) setMenu(false);
    }
  });
})();
