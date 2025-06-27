const pets = [
  { name: "Mimic Octopus", value: "25T", demand: 9, status: "over" },
  { name: "Raccoon", value: "22.5T", demand: 9, status: "over" },
  { name: "Disco Bee", value: "20T", demand: 10, status: "over" },
  { name: "Butterfly", value: "15T", demand: 6, status: "fair" },
  { name: "Dragonfly", value: "13T", demand: 10, status: "fair" },
  { name: "Bear Bee", value: "1T–3T", demand: 9, status: "fair" },
  { name: "Queen Bee", value: "6T", demand: 9, status: "over" },
  { name: "Moon Cat", value: "800B", demand: 7, status: "fair" },
  { name: "Red Fox", value: "850B", demand: 6, status: "under" },
  { name: "Chicken Zombie", value: "900B–1T", demand: 5, status: "under" }
];

const tableBody = document.querySelector("#valuesTable tbody");
const searchInput = document.getElementById("searchInput");

function renderPets(data) {
  tableBody.innerHTML = "";
  data.forEach(pet => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${pet.name}</td>
      <td>${pet.value}</td>
      <td>${pet.demand}/10</td>
      <td><span class="status ${pet.status}">${pet.status.toUpperCase()}</span></td>
    `;
    tableBody.appendChild(row);
  });
}
renderPets(pets);

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const filtered = pets.filter(pet => pet.name.toLowerCase().includes(term));
  renderPets(filtered);
});

function parseValue(val) {
  if (typeof val === "string") {
    if (val.includes("–")) val = val.split("–")[0];
    val = val.replace(/[^0-9.]/g, "");
  }
  return parseFloat(val);
}

function sortPets(type, direction) {
  const sorted = [...pets].sort((a, b) => {
    let aVal = type === "value" ? parseValue(a.value) : a.demand;
    let bVal = type === "value" ? parseValue(b.value) : b.demand;
    return direction === "asc" ? aVal - bVal : bVal - aVal;
  });
  renderPets(sorted);
}
