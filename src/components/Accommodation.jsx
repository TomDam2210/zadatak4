import React from "react";
import "./Accommodation.css";

const Accommodation = ({ accommodation }) => {
  return (
    <div className="accommodation">
      <div className="accommodationSummary">
        <img src={accommodation.image} alt={accommodation.title} />
        <div>
          <h3>{accommodation.title}</h3>
          <p>Capacity: {accommodation.capacity}</p>
          <p>Beach Distance: {accommodation.beachDistanceInMeters} meters</p>
        </div>
      </div>
      <div className="accommodationExtra">
        <h5>Amenities</h5>
        <ul className="amenitiesList">
          {Object.entries(accommodation.amenities).map(([amenity, value]) => (
            <li key={amenity}>
              {amenity}: {value ? "Yes" : "No"}
            </li>
          ))}
        </ul>
        <div className="reservation_button">Reservation</div>
      </div>
    </div>
  );
};

export default Accommodation;
