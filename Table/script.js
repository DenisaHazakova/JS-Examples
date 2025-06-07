const cities = [
  {
    id: 1001,
    name: "Bratislava",
    area: 367.6,
    population: 475503,
    location: "West",
  },
  {
    id: 1002,
    name: "Košice",
    area: 242.8,
    population: 228249,
    location: "East",
  },
  {
    id: 1003,
    name: "Prešov",
    area: 70.4,
    population: 81449,
    location: "East",
  },
  {
    id: 1004,
    name: "Žilina",
    area: 80.0,
    population: 79468,
    location: "Middle",
  },
  {
    id: 1005,
    name: "Nitra",
    area: 100.5,
    population: 76716,
    location: "West",
  },
  {
    id: 1006,
    name: "Banská Bystrica",
    area: 103.4,
    population: 76320,
    location: "Middle",
  },
  {
    id: 1007,
    name: "Trnava",
    area: 71.5,
    population: 65853,
    location: "West",
  },
  {
    id: 1008,
    name: "Martin",
    area: 67.7,
    population: 54838,
    location: "Middle",
  },
  {
    id: 1009,
    name: "Trenčín",
    area: 82.0,
    population: 54265,
    location: "West",
  },
  {
    id: 1010,
    name: "Poprad",
    area: 63.0,
    population: 49283,
    location: "East",
  },
];

const tableColumns = ["name", "area", "population", "location"];
let selectedRowCityIndex = null;

document.addEventListener("DOMContentLoaded", (event) => {
  renderCities();
});

function renderCities() {
  //declare of element table body
  const tbody = document.getElementById("tableBody");

  //loop through cities
  for (let index = 0; index < cities.length; index++) {
    const city = cities[index];
    //create row element
    const row = document.createElement("tr");
    row.setAttribute("data-index", index);

    //append it to its parent table body
    tbody.appendChild(row);

    //loop through tableColumns
    for (const column of tableColumns) {
      //create column el
      const columnEl = document.createElement("td");

      columnEl.setAttribute("data-key", column);
      //insert value to columnEl
      columnEl.innerHTML = city[column];

      //append columnEl to its parent
      row.appendChild(columnEl);
    }

    //create column for action
    const actColEl = document.createElement("td");

    //create button element and name it show detail
    const btn = document.createElement("button");
    btn.textContent = "Show detail";

    //assign data-id with id of city
    btn.setAttribute("data-id", city.id);

    //append btn to its parent
    actColEl.appendChild(btn);

    //append it to its parent
    row.appendChild(actColEl);

    //function to call when click on btn
    btn.addEventListener("click", onRowClick);
  }
}

// clicking on button show detail
function onRowClick(event) {
  //find id of button
  const rowId = event.target.getAttribute("data-id");
  //check if button id is the same as city id
  selectedRowCityIndex = cities.findIndex((city) => city.id == rowId);
  const foundedCity = cities[selectedRowCityIndex];

  //declare parent element div
  const parentEl = document.getElementById("cityDetail");
  parentEl.classList.remove("hidden");

  // declaration of all inputs
  const cityInput = document.getElementById("cityName");
  const areaInput = document.getElementById("area");
  const populationInput = document.getElementById("population");
  const locationInput = document.getElementById("location");

  // insert values from object foundedCity into each input
  cityInput.value = foundedCity.name;
  areaInput.value = foundedCity.area;
  populationInput.value = foundedCity.population;
  locationInput.value = foundedCity.location;
  //hodnota kazdeho inputu/ zadeklarovat si input cez getelement byid / potom input.value = foundedObject.name
  ////inputy pod parentom div s classou hidden
  //
}

function onUpdate() {
  const updatedCity = {
    name: document.getElementById("cityName").value,
    area: document.getElementById("area").value,
    location: document.getElementById("location").value,
    population: document.getElementById("population").value,
  };
  cities[selectedRowCityIndex] = updatedCity;

  const tbody = document.getElementById("tableBody");
  const trEl = tbody.querySelector(`tr[data-index="${selectedRowCityIndex}"]`);

  for (const column of tableColumns) {
    const tdElement = trEl.querySelector(`td[data-key=${column}]`);
    tdElement.textContent = updatedCity[column];
  }
}
