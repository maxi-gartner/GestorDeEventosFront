import { useState, useEffect } from "react";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/event")
      .then((res) => res.json())
      .then((data) => setEvents(data.response.map((event) => event.data)))
      .catch((err) => console.log(err));
  }, []);
  console.log("events", events);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search events by name..."
        value={filter}
        onChange={handleFilterChange}
        className="w-full p-2 mb-5"
      />
      <div>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <img
                src={event.photo}
                alt={event.name}
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                }}
              />
              <h2>{event.name}</h2>
              <p>{event.description}</p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Minimum Age:</strong> {event.minimumAge}
              </p>
            </div>
          ))
        ) : (
          <p>No se encontraron eventos.</p>
        )}
      </div>
    </div>
  );
}
