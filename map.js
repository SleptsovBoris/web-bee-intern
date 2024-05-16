document.addEventListener("DOMContentLoaded", function () {
  ymaps.ready(init);

  function init() {
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
  }
});
