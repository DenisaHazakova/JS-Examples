const cities = [
  { name: "Bratislava", area: 367.6, population: 475503, location: "West" },
  { name: "Košice", area: 242.8, population: 228249, location: "East" },
  { name: "Prešov", area: 70.4, population: 81449, location: "East" },
  { name: "Žilina", area: 80.0, population: 79468, location: "Middle" },
  { name: "Nitra", area: 100.5, population: 76716, location: "West" },
  {
    name: "Banská Bystrica",
    area: 103.4,
    population: 76320,
    location: "Middle",
  },
  { name: "Trnava", area: 71.5, population: 65853, location: "West" },
  { name: "Martin", area: 67.7, population: 54838, location: "Middle" },
  { name: "Trenčín", area: 82.0, population: 54265, location: "West" },
  { name: "Poprad", area: 63.0, population: 49283, location: "East" },
];

document.addEventListener("DOMContentLoaded", (event) => {
  renderCities();
});

function renderCities() {
  // Declare table body element
  const tbody = document.getElementById("tableBody");
  for (const city of cities) {
    // Create the row of table body
    const row = document.createElement("tr");

    // body -> tr ->td

    // Create the column of table body
    tbody.appendChild(row);
    const columns = ["name", "area", "population", "location"];
    for (const column of columns) {
      const columnEl = document.createElement("td");
      // column === 'name'
      // city === { 'name': '....' }
      // city.name
      columnEl.innerHTML = city[column];
      row.appendChild(columnEl);
    }

    // need to create a row and append it to parent = table body
    // then need to create a column in that row = it is child of table body
    // in that column need to insert all data
  }
}
