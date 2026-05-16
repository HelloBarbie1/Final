document.addEventListener("DOMContentLoaded", () => {
  const headerTarget = document.getElementById("site-header");

  if (headerTarget) {
    fetch("includes/header.html")
      .then(res => res.text())
      .then(data => {
        headerTarget.innerHTML = data;
      })
      .catch(err => console.error("Header load failed:", err));
  }

  const footerTarget = document.getElementById("site-footer");

  if (footerTarget) {
    fetch("includes/footer.html")
      .then(res => res.text())
      .then(data => {
        footerTarget.innerHTML = data;
      })
      .catch(err => console.error("Footer load failed:", err));
  }
});