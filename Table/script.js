// Creating array of objects named cities with parameters id, name, area, location
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

// Declare global variable named tableColumns as array to use these values later in this file
const tableColumns = ["name", "area", "population", "location"];

// Create variable as let because it will change later in this code. It is declared as global one so we can
// use it later
let selectedRowCityIndex = null;

// With DOMContent Loaded we ensure that when DOM is loaded, then function renderCities is called
document.addEventListener("DOMContentLoaded", (event) => {
  renderCities();
});

function renderCities() {
  // Declare of element table body
  const tbody = document.getElementById("tableBody");

  // Loop through cities from index 0
  for (let index = 0; index < cities.length; index++) {
    const city = cities[index];
    
    // Create row element
    const row = document.createElement("tr");
    // Insert atribute to row so we can later use index of current row
    row.setAttribute("data-index", index);

    // Append it to its parent - table body
    tbody.appendChild(row);

    // Loop through tableColumns
    for (const column of tableColumns) {
      // Create column el
      const columnEl = document.createElement("td");
      // Set atribute to column element so we can use name of column later
      columnEl.setAttribute("data-key", column);
      // Insert value to columnEl
      columnEl.innerHTML = city[column];

      // Append columnEl to its parent
      row.appendChild(columnEl);
    }

    // Create last column for action
    const actColEl = document.createElement("td");

    // Create button element and name it 'show detail'
    const btn = document.createElement("button");
    btn.textContent = "Show detail";

    // Assign data-id atribute with id of city
    btn.setAttribute("data-id", city.id);

    // Append btn to its parent
    actColEl.appendChild(btn);

    // Append it to its parent
    row.appendChild(actColEl);

    // Function to call when click on btn
    btn.addEventListener("click", onRowClick);
  }
}

// Clicking on button show detail
function onRowClick(event) {
  // Find id of button
  const rowId = event.target.getAttribute("data-id");
  // Check if button id is the same as city id
  selectedRowCityIndex = cities.findIndex((city) => city.id == rowId);
  const foundedCity = cities[selectedRowCityIndex];

  // Declare parent element div including all inputs
  const parentEl = document.getElementById("cityDetail");

  // We want to show the div, so we need to remove the class which ensures that div is hidden
  // After that parentEl will be shown on web
  parentEl.classList.remove("hidden");

  // Declaration of all inputs
  const cityInput = document.getElementById("cityName");
  const areaInput = document.getElementById("area");
  const populationInput = document.getElementById("population");
  const locationInput = document.getElementById("location");

  // Insert values from object foundedCity into each input
  cityInput.value = foundedCity.name;
  areaInput.value = foundedCity.area;
  populationInput.value = foundedCity.population;
  locationInput.value = foundedCity.location;
}

// We want to ensure that changes in array of objects cities will be updates/shown also in the table on web
function onUpdate() {
  // Declare the object updatedCity with the same attributes as cities has and assign the currentvalues of inputs
  const updatedCity = {
    name: document.getElementById("cityName").value,
    area: document.getElementById("area").value,
    location: document.getElementById("location").value,
    population: document.getElementById("population").value,
  };

  // selectedRowCityIndex is the index of clicked row
  // cities[selectedRowCityIndex] = result is object currently clicked
  // we assign value of clicked object to object details filled in inputs
  cities[selectedRowCityIndex] = updatedCity;

  // Declare element table body
  const tbody = document.getElementById("tableBody");
  // Declare row currently clicked in main table cities
  const trEl = tbody.querySelector(`tr[data-index="${selectedRowCityIndex}"]`);

  // Loop through array tableColumns
  for (const column of tableColumns) {
    // Declare the column element
    // With querySelector we find attribute of column with the same value as it is currently the value of const column in loop
    // With that we ensure that changed value in input will be reflected in correct column in main table columns
    const tdElement = trEl.querySelector(`td[data-key=${column}]`);
    // Into founded column we insert that value which is inserted in inputs
    tdElement.textContent = updatedCity[column];
  }
}
