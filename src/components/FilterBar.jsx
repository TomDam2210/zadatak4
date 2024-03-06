import React, { useState } from "react";
import "./FilterBar.css";

const FilterBar = ({ onFilter }) => {
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [people, setPeople] = useState(0);
  const [amenities, setAmenities] = useState({
    airConditioning: false,
    parkingSpace: false,
    petFriendly: false,
    pool: false,
    wifi: false,
    tv: false,
  });

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handlePeopleChange = (e) => {
    setPeople(e.target.value);
  };

  const handleAmenityChange = (e) => {
    const amenity = e.target.value;
    setAmenities({ ...amenities, [amenity]: !amenities[amenity] });
  };

  const handleFilterClick = () => {
    onFilter({ dateRange, people, amenities });
  };

  return (
    <div className="filterBar">
      <div className="dateRange">
        <input
          type="date"
          name="start"
          value={dateRange.start}
          onChange={handleDateChange}
        />
        <input
          type="date"
          name="end"
          value={dateRange.end}
          onChange={handleDateChange}
        />
      </div>
      <input
        type="number"
        min="1"
        className="peopleInput"
        value={people}
        onChange={handlePeopleChange}
      />
      <div className="amenities">
        {Object.entries(amenities).map(([amenity, checked]) => (
          <div key={amenity} className="amenityInput">
            <input
              type="checkbox"
              value={amenity}
              checked={checked}
              onChange={handleAmenityChange}
            />
            <label>{amenity}</label>
          </div>
        ))}
      </div>
      <div className="button_filter">
        <button onClick={handleFilterClick}>Filter</button>
      </div>
    </div>
  );
};

export default FilterBar;
