// src/components/SearchResultsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterOptions from './FilterOptions';

function SearchResultsPage() {
    const [searchResults, setSearchResults] = useState([]);
    const [filters, setFilters] = useState({
        status: '',
        category: '',
    });
    const [query, setQuery] = useState("");

    // Fetch results based on search query and filters
    useEffect(() => {
        const fetchResults = () => {
            let url = `http://127.0.0.1:8000/api/tasks/?search=${query}`;

            if (filters.status) {
                url += `&status=${filters.status}`;
            }
            if (filters.category) {
                url += `&category=${filters.category}`;
            }

            axios.get(url)
                .then(response => setSearchResults(response.data))
                .catch(error => console.error("Error fetching search results:", error));
        };

        fetchResults();
    }, [query, filters]);

    // Handle filter changes
    const handleFilterChange = (filterType, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: value
        }));
    };

    // Update the query from the search bar
    const handleSearch = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div className="search-results-page">
            <input
                type="text"
                placeholder="Search tasks or projects..."
                value={query}
                onChange={handleSearch}
            />
            <FilterOptions filters={filters} onFilterChange={handleFilterChange} />
            <div className="results-list">
                {searchResults.map(result => (
                    <div key={result.id} className="result-item">
                        <h3>{result.title}</h3>
                        <p>{result.description}</p>
                        <span>Status: {result.status}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchResultsPage;
