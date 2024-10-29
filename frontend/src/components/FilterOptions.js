// src/components/FilterOptions.js
import React from 'react';

function FilterOptions({ filters, onFilterChange }) {
    return (
        <div className="filter-options">
            <select onChange={(e) => onFilterChange("status", e.target.value)}>
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            <select onChange={(e) => onFilterChange("category", e.target.value)}>
                <option value="">All Categories</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="other">Other</option>
            </select>
        </div>
    );
}

export default FilterOptions;
