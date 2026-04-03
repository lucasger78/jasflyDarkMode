
const flagsElement = document.getElementById("flags");
const textsToChange = document.querySelectorAll("[data-section]");

// Marca la bandera activa visualmente
const setActiveFlag = (language) => {
  const allFlags = document.querySelectorAll(".flags_items");
  allFlags.forEach((flag) => {
    if (flag.dataset.language === language) {
      flag.classList.add("active");
    } else {
      flag.classList.remove("active");
    }
  });
};

const changeLanguage = async (language) => {
  const requestJson = await fetch(`js/${language}.json`);
  const texts = await requestJson.json();

  for (const textToChange of textsToChange) {
    const section = textToChange.dataset.section;
    const value = textToChange.dataset.value;
    textToChange.innerHTML = texts[section][value];
  }

  // Almacena el idioma seleccionado
  localStorage.setItem("selectedLanguage", language);

  // Actualiza visualmente la bandera activa
  setActiveFlag(language);
};

const loadLanguage = () => {
  const selectedLanguage = localStorage.getItem("selectedLanguage");

  if (selectedLanguage) {
    changeLanguage(selectedLanguage);
  } else {
    // Idioma predeterminado: español (Argentina)
    changeLanguage("es");
    setActiveFlag("es");
  }
};

flagsElement.addEventListener("click", (e) => {
  const language = e.target.closest(".flags_items")?.dataset.language;
  if (language) {
    changeLanguage(language);
  }
});

// Carga el idioma al cargar la página
loadLanguage();

// const loadLanguage = async () => {
//   // Verificar si el idioma seleccionado ya está almacenado en el almacenamiento local del navegador
//   const selectedLanguage = localStorage.getItem("selectedLanguage");

//   if (selectedLanguage) {
//     changeLanguage(selectedLanguage);
//   } else {
//     // Cargar el archivo "es.json" y almacenar su contenido en el almacenamiento local
//     const response = await fetch("es.json");
//     const languageData = await response.json();
//     localStorage.setItem("selectedLanguage", JSON.stringify(languageData));
//     changeLanguage(languageData);
//   }
// };

// flagsElement.addEventListener("click", (e) => {
//   changeLanguage(e.target.parentElement.dataset.language);
// });

// // Cargar el idioma al cargar la página
// loadLanguage();

