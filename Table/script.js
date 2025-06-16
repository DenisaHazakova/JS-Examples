// Creating array of objects named cities with parameters id, name, area, location
let cities = [
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

function createTableRow(city, tableEl) {

  // Create row element
  const row = document.createElement("tr");
  // Insert atribute to row so we can later use index of current row
  row.setAttribute("data-id", city.id);

  // Append it to its parent - table body
  tableEl.appendChild(row);

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
  // Create column element for action
  const actColEl = document.createElement("td");

  // Create div element
  const divEdit = document.createElement('div');
  // Create class for created element
  divEdit.classList.add('divEdit');

  // Create button element and name it 'show detail'
  const btn = document.createElement("button");
  btn.textContent = "Show detail";
  // Adding class 'editBtn'
  btn.classList.add('editBtn');

  // Create button element for removing the row and name it 'Remove'
  const btnRemove = document.createElement('button');
  btnRemove.textContent = "Remove";
  // Adding class 'editBtn'
  btnRemove.classList.add('editBtn');

  // Append buttons to div element
  divEdit.appendChild(btn);
  divEdit.appendChild(btnRemove);

  // Assign data-id atribute with id of city
  btn.setAttribute("data-id", city.id);
  btnRemove.setAttribute("data-id", city.id);


  actColEl.appendChild(divEdit);

  // Append it to its parent
  row.appendChild(actColEl);

  // Function to call when click on btn 'Show details'
  btn.addEventListener("click", onRowClick);

  // Function to call when click on btn 'remove'
  btnRemove.addEventListener('click', onRemoveClick)
}

function renderCities() {
  // Declare of element table body
  const tbody = document.getElementById("tableBody");

  // Loop through cities from index 0
  for (const city of cities) {
    createTableRow(city, tbody);
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

function onRemoveClick(event) {

  // Find id of clicked button
  const rowId = event.target.getAttribute('data-id');

  // Declare element table body
  const tbody = document.getElementById("tableBody");

  // Declare row currently clicked in main table cities
  const trEl = tbody.querySelector(`tr[data-id="${rowId}"]`);


  // Need to use filter on cities
  // Do not find the index so we can return only valid rows
  cities = cities.filter(city => city.id != rowId)
  trEl.remove();
}

// We want to ensure that changes in array of objects cities will be updates/shown also in the table on web
function onUpdate() {
  const originObject = cities[selectedRowCityIndex];

  // Declare the object updatedCity with the same attributes as cities has and assign the currentvalues of inputs
  const updatedCity = {
    id: originObject.id,
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
  //tr data id je id objektu = 1001, 1002, 1003, atd
  const trEl = tbody.querySelector(`tr[data-id="${cities[selectedRowCityIndex].id}"]`);

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


function onAddBtnClick() {

  // Find div element with inputs
  const divEl = document.getElementById('addCityDetail');
  // When clicking on button, classList hiddenDiv from div element will be removed
  divEl.classList.remove('hiddenDiv');

}

function generateId() {
  return Math.floor(Math.random() * 10);
}

function addDetail() {

  // Create new object from inputs
  const cityDetailObject = {
    id: generateId(),
    name: document.getElementById('cityDet').value,
    area: document.getElementById('areaDet').value,
    population: document.getElementById('populationDet').value,
    location: document.getElementById('locationDet').value
  }
  // Need to declare tablebody
  const tbody = document.getElementById("tableBody");
  createTableRow(cityDetailObject, tbody);
  console.log(cityDetailObject);

  // after filing the inputs i click on save and the inputs will reflect as last row of table cities
}
