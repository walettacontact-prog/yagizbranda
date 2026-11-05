// Telefonda menü: düğmeyle açılır; bir bağlantıya dokunulunca, Esc'e basılınca ya da dışarı dokunulunca kapanır.
const dugme = document.querySelector(".menu-ac");
const menu = document.getElementById("menu");
if (dugme && menu) {
  const ayarla = (acik) => { menu.classList.toggle("acik", acik); dugme.setAttribute("aria-expanded", String(acik)); };
  dugme.addEventListener("click", () => ayarla(!menu.classList.contains("acik")));
  menu.addEventListener("click", (o) => { if (o.target.closest("a")) ayarla(false); });
  document.addEventListener("keydown", (o) => { if (o.key === "Escape") ayarla(false); });
  document.addEventListener("click", (o) => { if (!o.target.closest(".ust")) ayarla(false); });
}
