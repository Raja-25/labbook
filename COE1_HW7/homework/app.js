// app.js
document.addEventListener("DOMContentLoaded", function () {
    const appRoot = document.getElementById("app-root");

    function renderApp() {
        // Clear the previous content of the app root
        appRoot.innerHTML = "";

        // Create and append the header
        const header = document.createElement("h1");
        header.textContent = "Countries Search";
        appRoot.appendChild(header);

        // Create and append the form
        const form = document.createElement("form");
        form.addEventListener("change", handleFormChange);
        form.innerHTML = `
          <div>
            <label>Please choose the type of search:</label><br>
            <input type="radio" id="byRegion" name="searchType" value="region">
            <label for="byRegion">By Region</label><br>
            <input type="radio" id="byLanguage" name="searchType" value="language">
            <label for="byLanguage">By Language</label><br>
          </div>
          <div>
            <label for="searchQuery">Please choose search query:</label><br>
            <select id="searchQuery" disabled>
              <option value="">Select value</option>
            </select>
          </div>
        `;
        appRoot.appendChild(form);

        // Create the table structure but don't append it yet
        const table = document.createElement("table");
        table.id = "resultsTable";
        appRoot.appendChild(table);
    }

    // Function to handle form change
    function handleFormChange(event) {
        const searchType = document.querySelector('input[name="searchType"]:checked');
        const searchQuerySelect = document.getElementById("searchQuery");

        if (!searchType || !searchQuerySelect.value) return; // No radio button or search query selected, do nothing

        const searchQuery = searchQuerySelect.value;

        let results;
        if (searchType.value === "region") {
            results = externalService.getCountryListByRegion(searchQuery);
        } else if (searchType.value === "language") {
            results = externalService.getCountryListByLanguage(searchQuery);
        }

        // Render the table with search results
        renderTable(results);
    }

    // Function to render table with search results
    function renderTable(results) {
        const table = document.getElementById("resultsTable");
        // Clear the previous content of the table
        table.innerHTML = "";

        // If no results, display a message
        if (results.length === 0) {
            const row = table.insertRow();
            const cell = row.insertCell();
            cell.textContent = "No items, please choose search query";
            return;
        }

        // Create table headers
        const headers = ["Country name", "Capital", "World region", "Languages", "Area", "Flag"];
        const headerRow = table.insertRow();
        headers.forEach(headerText => {
            const headerCell = document.createElement("th");
            headerCell.textContent = headerText;
            headerRow.appendChild(headerCell);
        });

        // Populate the table with search results
        results.forEach(country => {
            const row = table.insertRow();
            row.addEventListener("mouseover", function () {
                this.style.backgroundColor = "lightgray";
            });
            row.addEventListener("mouseout", function () {
                this.style.backgroundColor = "";
            });

            const cells = [
                country.name,
                country.capital,
                country.region,
                Object.values(country.languages).join(", "),
                country.area,
                `<img src="${country.flagURL}" width="50" height="30">`
            ];

            cells.forEach(cellText => {
                const cell = row.insertCell();
                cell.innerHTML = cellText;
            });
        });
    }

    // Call renderApp to initialize the application interface
    renderApp();
});
