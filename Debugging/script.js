(function () {
  // ------- Helpers -------
  // We can create our own custom functions to help us with the DOM manipulation.
  // These are functions that we can use to select elements in the DOM and not
  // repeat ourselves each time.

  function selectElement(selector, scope) {
    // selectElement finds the FIRST element that matches a CSS selector.
    // if you pass a "scope" (like a parent element),
    // it only looks inside that element.
    if (scope !== undefined && scope !== null) {
      return scope.querySelector(selector);
    }
    return document.querySelector(selector);
  }

  function selectAllElements(selector, scope) {
    // Finds ALL matching elements and returns a real array.
    if (scope !== undefined && scope !== null) {
      return Array.from(scope.querySelectorAll(selector));
    }
    return Array.from(document.querySelectorAll(selector));
  }

  // ------- Nav dropdown logic -------
  // This function is used to initialize the navigation dropdown.
  // It is called when the DOM is ready.
  // What does it mean for the DOM to be ready?
  // The DOM is ready when the HTML has been parsed and the DOM tree has been built.
  function initNavDropdown() {
    const dropdown = selectElement("[data-dropdown]");
    if (!dropdown) return;

    const toggleButton = selectElement(".dropdown-toggle", dropdown);
    const menu = selectElement(".dropdown-menu", dropdown);

    function openMenu() {
      if (!menu.classList.contains("show")) {
        menu.classList.add("show");
      }
      dropdown.setAttribute("aria-expanded", "true");
      toggleButton.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
      if (menu.classList.contains("show")) {
        menu.classList.remove("show");
      }
      dropdown.setAttribute("aria-expanded", "false");
      toggleButton.setAttribute("aria-expanded", "false");
    }

    function toggleMenu() {
      if (menu.classList.contains("show")) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    toggleButton.addEventListener("click", function () {
      toggleMenu();
    });

    document.addEventListener("click", function (event) {
      if (!dropdown.contains(event.target)) {
        closeMenu();
      }
    });

    toggleButton.addEventListener("keydown", function (event) {
      const key = event.key;
      if (key === "ArrowDown" || key === "Enter" || key === " ") {
        event.preventDefault();
        openMenu();
        const firstLink = selectElement("a", menu);
        if (firstLink) {
          firstLink.focus();
        }
      }
      if (key === "Escape") {
        closeMenu();
        toggleButton.focus();
      }
    });

    selectAllElements("a", menu).forEach(function (link, index, array) {
      link.addEventListener("keydown", function (event) {
        const key = event.key;
        if (key === "Escape") {
          event.preventDefault();
          closeMenu();
          toggleButton.focus();
          return;
        }
        if (key === "ArrowDown") {
          event.preventDefault();
          const nextLink = array[index + 1] || array[0];
          nextLink.focus();
          return;
        }
        if (key === "ArrowUp") {
          event.preventDefault();
          const previousLink = array[index - 1] || array[array.length - 1];
          previousLink.focus();
        }
      });
    });
  }

  // ------- Dummy API -------
  function fetchMovies() {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve([
          { id: 1, title: "The Silent Frame", year: 1999, rating: 8.1 },
          { id: 2, title: "City of Echoes", year: 2004, rating: 7.5 },
          { id: 3, title: "Nebula Nights", year: 2019, rating: 7.9 },
          { id: 4, title: "Paper Tigers", year: 2007, rating: 6.8 },
          { id: 5, title: "Crimson Harbor", year: 2013, rating: 7.2 },
          { id: 6, title: "Orbital Garden", year: 2021, rating: 8.4 },
          { id: 7, title: "Blue Alley", year: 1994, rating: 7.0 },
          { id: 8, title: "Iron Sonata", year: 2011, rating: 6.9 },
          { id: 9, title: "Velvet Horizon", year: 2001, rating: 7.6 },
          { id: 10, title: "Glass Kingdom", year: 2016, rating: 7.8 },
        ]);
      }, 650);
    });
  }

  // ------- Render -------
  function renderMovies(movies) {
    const moviesGrid = selectElement("#moviesGrid");
    if (!moviesGrid) return;

    moviesGrid.setAttribute("aria-busy", "true");

    movies.forEach(function (movie) {
      const card = document.createElement("article");
      card.className = "movie-card";
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", movie.title + " (" + movie.year + ")");

      const thumbnail = document.createElement("div");
      thumbnail.className = "movie-thumb";
      card.appendChild(thumbnail);

      const body = document.createElement("div");
      body.className = "movie-body";

      const titleHeading = document.createElement("h3");
      titleHeading.className = "movie-title";
      titleHeading.textContent = movie.title;

      const metaParagraph = document.createElement("p");
      metaParagraph.className = "movie-meta";
      metaParagraph.textContent =
        "Year: " + movie.year + " • Rating: " + movie.rating;

      body.appendChild(titleHeading);
      body.appendChild(metaParagraph);
      card.appendChild(body);
      moviesGrid.appendChild(card);
    });

    moviesGrid.setAttribute("aria-busy", "false");
  }

  function loadMovies() {
    const moviesGrid = selectElement("#moviesGrid");
    if (moviesGrid) {
      moviesGrid.setAttribute("aria-busy", "true");
    }
    return fetchMovies().then(function (data) {
      renderMovies(data);
      return data;
    });
  }

  // ------- Footer -------
  function initFooter() {
    const yearElement = selectElement("#year");
    if (yearElement) {
      yearElement.textContent = String(new Date().getFullYear());
    }

    const languageSelect = selectElement("#langSelect");
    if (languageSelect) {
      languageSelect.addEventListener("change", function () {
        const value = languageSelect.value;
        console.log("Language changed to:", value);
      });
    }
  }

  function initReloadButton() {
    const reloadButton = selectElement("#reloadBtn");
    if (reloadButton) {
      reloadButton.addEventListener("click", function () {
        loadMovies();
      });
    }
  }

  // ATTENTION:
  // These functions are normally "hidden" inside the
  // (function () { ... })() wrapper and can’t be run
  // directly from the browser Console.
  //
  // By attaching them to `window`, they become global.
  // That means we can type their names
  // into the Console and call them manually:
  //
  //    > loadMovies()
  //    > initNavDropdown()
  //
  // This is just for demo & practice during class.
  // In real projects you usually *don’t* expose them.
  window.initNavDropdown = initNavDropdown;
  window.loadMovies = loadMovies;

  // ------- Init on DOM ready -------
  document.addEventListener("DOMContentLoaded", function () {
    initNavDropdown();
    initFooter();
    initReloadButton();
    loadMovies();
  });
})();
