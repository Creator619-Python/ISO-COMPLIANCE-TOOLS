async function loadIMS() {
  const response = await fetch('Merged_ISO_Clauses.json');
  const data = await response.json();
  window.IMSData = data.Merged_Standards; // <— updated key name
  renderResults(window.IMSData);
}

function renderResults(clauses) {
  const container = document.getElementById('results');
  container.innerHTML = '';

  clauses.forEach(c => {
    const div = document.createElement('div');
    div.className = 'clause-card';
    div.innerHTML = `
      <h3>${c.Standard} — Clause ${c.Clause}</h3>
      <p><strong>${c.Title}</strong></p>
      <p>${c.Purpose}</p>
      <details>
        <summary>More details</summary>
        <p><b>Evidence:</b> ${c.Evidence}</p>
        <p><b>Integration:</b> ${c.Integration}</p>
        <p><b>Example:</b> ${c.Example}</p>
      </details>
    `;
    container.appendChild(div);
  });
}

function setupFilters() {
  document.getElementById('standardFilter').addEventListener('change', filterData);
  document.getElementById('searchBox').addEventListener('input', filterData);
}

function filterData() {
  const filter = document.getElementById('standardFilter').value.toLowerCase();
  const query = document.getElementById('searchBox').value.toLowerCase();

  const filtered = window.IMSData.filter(c =>
    (!filter || c.Standard.toLowerCase().includes(filter)) &&
    (c.Clause.toLowerCase().includes(query) ||
     c.Title.toLowerCase().includes(query) ||
     c.Purpose.toLowerCase().includes(query))
  );

  renderResults(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
  loadIMS();
  setupFilters();
});
