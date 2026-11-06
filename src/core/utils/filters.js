import { renderTypeFilterButtons } from "../ui/renderer.js";

let selectedProvince = "all";
const activeTypes = new Set();
let searchQuery = "";



// ======= Función filtros general ======= //
function applyFilters(events, onFilterChange) {
    let result = events;

    if (!events || !Array.isArray(events)) return;


    //Filtrar por provincia
    if (selectedProvince !== "all") {
        result = result.filter(item => item.province === selectedProvince);
    }

    //Filtrar por tipo de categoria
    if (activeTypes.size > 0) {
        result = result.filter(item => activeTypes.has(item.type));
    }

    //Filtrar por texto en barra de busqueda
    if (searchQuery.trim() !== "") {
        const query = searchQuery.toLocaleLowerCase();
        result = result.filter(item => {
            const name = item.name ? item.name.toLocaleLowerCase() : "";
            const description = item.description ? item.description.toLocaleLowerCase() : "";
            const municipality = item.municipality ? item.municipality.toLocaleLowerCase() : "";

            return name.includes(query) || description.includes(query) || municipality.includes(query);
        });

    }
    if (onFilterChange) {
        onFilterChange(result);
    }

}

// ========== Filtros por provincias =========== //
function setProvinceOptions(events, onFilterChange) {
    const selector = document.getElementById("province-select");
    if (!selector) return;
    const provinces = ["Bizkaia", "Gipuzkoa", "Araba"];


    provinces.forEach(p => {
        const option = document.createElement("option");
        option.value = p;
        option.textContent = p;
        selector.append(option)

    });
    selector.addEventListener("change", (e) => {
        selectedProvince = e.target.value;
        applyFilters(events, onFilterChange);
    });
}

// ========= Filtros chip por categorias ======== //
function setTypeFilters(events, onFilterChange) {
    const uniqueTypes = [...new Set(events.map(e => e.type).filter(Boolean))]
        .filter(type => type.toLocaleLowerCase() !== "todos");

    const handleToggleType = (selectedType) => {
        if (selectedType === "Todos") {
            activeTypes.clear();
            searchQuery = ""; // Limpiamos todos los filtros seleccionados
        } else {
            if (activeTypes.has(selectedType)) {
                activeTypes.delete(selectedType);
            } else {
                activeTypes.add(selectedType);
            }
        }

        renderTypeFilterButtons(uniqueTypes, activeTypes, handleToggleType);
        applyFilters(events, onFilterChange)

    };

    renderTypeFilterButtons(uniqueTypes, activeTypes, handleToggleType);

}


// ============ Filtro de barra de búsqueda ================ //
function setSearch(events, onFilterChange) {
    const searchForm = document.getElementById("search-form"); 
    const searchInput = document.getElementById("search-input");
    if (!searchInput) return;

    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        applyFilters(events, onFilterChange);
    })

    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault(); 
            searchQuery = searchInput.value;
            applyFilters(events, onFilterChange);
        });
    }
}





export {
    setProvinceOptions,
    setTypeFilters,
    setSearch

}

