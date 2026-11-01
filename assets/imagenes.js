function imgFail(img) {
  if (img.dataset.fallback) {
    img.src = img.dataset.fallback;
    img.removeAttribute("data-fallback");
    return;
  }
  const a = document.createElement("a");
  a.className = "imglink";
  a.href = img.dataset.source;
  a.textContent = "Ver la imagen en la fuente";
  img.replaceWith(a);
}
