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
  // declaration of table body element
  const tbody = document.getElementById("tableBody");

  //loop through array of objects cities
  for (const city of cities) {
    // create row element
    const rowEl = document.createElement("tr");

    // insertion of child element row to its parent - table body element
    tbody.appendChild(rowEl);

    // create array of columns samely named as atributes in object city
    const columns = ["name", "area", "population", "location"];

    // loop through array of columns
    for (const column of columns) {
      // create column element
      const columnEl = document.createElement("td");

      // Assign value of current value of column in object city
      // first value of column is 'name', value of name in city is 'Bratislava'
      // second value of column is 'area', value of area in city is '367.6', etc.
      columnEl.innerHTML = city[column];

      // insertion of child element column into its parent element row
      rowEl.appendChild(columnEl);
    }
  }
}
