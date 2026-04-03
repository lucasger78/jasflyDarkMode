document.addEventListener("DOMContentLoaded", () => {
  const flagsElement    = document.getElementById("flags");
  const textsToChange   = document.querySelectorAll("[data-section]");
  let   currentLanguage = localStorage.getItem("selectedLanguage") || "es";

  // Esta función ahora es la única que decide el estado "real" de las banderas
  const updateFlagsVisualState = () => {
    document.querySelectorAll(".flags_items").forEach((flag) => {
      const img = flag.querySelector("img");
      const isActive = flag.dataset.language === currentLanguage;
      img.style.filter = isActive ? "grayscale(0%)" : "grayscale(100%)";
    });
  };

  const changeLanguage = async (language, force = false) => {
    if (language === currentLanguage && !force) return; // evitar recarga innecesaria

    currentLanguage = language;
    localStorage.setItem("selectedLanguage", language);

    const requestJson = await fetch(`js/${language}.json`);
    const texts = await requestJson.json();

    for (const textToChange of textsToChange) {
      const section = textToChange.dataset.section;
      const value   = textToChange.dataset.value;
      textToChange.innerHTML = texts[section][value];
    }

    // Actualizamos TODAS las banderas al estado final
    updateFlagsVisualState();
  };

  // Hover: mostramos color siempre (independientemente del estado)
  document.querySelectorAll(".flags_items").forEach((flag) => {
    const img = flag.querySelector("img");

    flag.addEventListener("mouseenter", () => {
      img.style.filter = "grayscale(0%)";
    });

    flag.addEventListener("mouseleave", () => {
      // Al salir → volvemos al estado "real" (activo o gris)
      const isActive = flag.dataset.language === currentLanguage;
      img.style.filter = isActive ? "grayscale(0%)" : "grayscale(100%)";
    });
  });

  // Click en cualquier parte del contenedor → delegación
  flagsElement.addEventListener("click", (e) => {
    const flagItem = e.target.closest(".flags_items");
    if (flagItem) {
      changeLanguage(flagItem.dataset.language);
    }
  });

  // Estado  inicial
  updateFlagsVisualState();         // ← importante: usamos la función dedicada
  
  // Si el idioma es distinto al que viene por defecto en el HTML (es), forzamos la carga
  if (currentLanguage !== "es") {
    changeLanguage(currentLanguage, true);
  }
});


