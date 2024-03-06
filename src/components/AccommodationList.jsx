import React, { useEffect, useState } from "react";
import Accommodation from "./Accommodation";
import FilterBar from "./FilterBar";
import axios from "axios";
import "./AccommodationList.css";

const AccommodationList = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: { start: "", end: "" },
    people: 1,
    amenities: {
      airConditioning: false,
      parkingSpace: false,
      petFriendly: false,
      pool: false,
      wifi: false,
      tv: false,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.adriatic.hr/test/accommodation"
        );
        setAccommodations(response.data);
        applyFilters(response.data);
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
    };

    const applyFilters = (data) => {
      const filteredAccommodations = data.filter((accommodation) => {
        const { dateRange, people, amenities } = filters;
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);

        const accommodationStartDate = new Date(accommodation.startDate);
        const accommodationEndDate = new Date(accommodation.endDate);

        const isDateInRange =
          startDate <= accommodationEndDate &&
          endDate >= accommodationStartDate;
        const isCapacityValid = accommodation.capacity >= people;

        const selectedAmenities = Object.entries(amenities)
          .filter(([_, value]) => value)
          .map(([amenity]) => amenity);

        const hasSelectedAmenities = selectedAmenities.every((amenity) =>
          accommodation.amenities.includes(amenity)
        );

        return isDateInRange && isCapacityValid && hasSelectedAmenities;
      });

      setAccommodations(filteredAccommodations);
    };

    fetchData();
  }, [filters]);

  return (
    <div className="all">
      <FilterBar onFilter={setFilters} />
      <div className="accommodationList">
        {accommodations.map((accommodation) => (
          <Accommodation key={accommodation.id} accommodation={accommodation} />
        ))}
      </div>
    </div>
  );
};

export default AccommodationList;
