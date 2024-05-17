document.addEventListener("DOMContentLoaded", function () {
  const contentDiv = document.getElementById("content");
  let startTime = Date.now();
  const defaultPage = "profile.html";

  async function loadContent(page) {
    try {
      const response = await fetch(page);
      if (!response.ok) {
        throw new Error(`Cannot load page: ${response.statusText}`);
      }
      const html = await response.text();
      contentDiv.innerHTML = html;

      if (page === "map.html") {
        initMap();
      } else if (page === "timer.html") {
        initTimer();
      }
    } catch (error) {
      console.error("Error loading content:", error);
      contentDiv.innerHTML = "<p>Error loading page. Please try again.</p>";
    }
  }

  function initMap() {
    ymaps.ready(function () {
      var map = new ymaps.Map("map", {
        center: [55.79846691223287, 49.10500362580664],
        zoom: 14,
      });
      var myPlacemark = new ymaps.Placemark(
        [55.79846691223287, 49.10500362580664],
        {
          hintContent: "Моя метка",
          balloonContent:
            "Это Мечеть Кул-Шариф! Одна из достопримечательностей Казанского Кремля",
        }
      );
      map.geoObjects.add(myPlacemark);
      document.getElementById("loader").style.display = "none";
    });
  }

  function initTimer() {
    const timerDisplay = document.querySelector(".timer");
    setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const hours = Math.floor(elapsedTime / 3600);
      const minutes = Math.floor((elapsedTime % 3600) / 60);
      const seconds = elapsedTime % 60;
      const formattedTime = `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      timerDisplay.textContent = `${formattedTime}`;
    }, 1000);
  }

  document.querySelectorAll("[data-link]").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const page = event.target.getAttribute("data-link") + ".html";
      history.pushState(null, "", page);
      loadContent(page);
    });
  });

  window.addEventListener("popstate", function () {
    let path = location.pathname.substring(1) || defaultPage;
    if (path == "index.html") {
      path = defaultPage;
      loadContent(path);
    }
  });

  loadContent(defaultPage);
});
