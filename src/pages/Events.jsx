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
  console.log("filteredEvents", filteredEvents);

  return (
    <div>
      <input
        type="text"
        placeholder="Search events by name..."
        value={filter}
        onChange={handleFilterChange}
        className="w-full p-2 mb-5 mt-2 rounded-md"
      />
      <div>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <a
              href={`/event/${event.id}`}
              key={index}
              className="mb-4 flex flex-col gap-1 py-2 border-t border-white "
            >
              <h2 className="text-lg font-semibold mb-2 w-full text-center">
                {event.name}
              </h2>
              <img
                src={event.photo}
                alt={event.name}
                className="w-full max-h-[200px] object-cover"
              />
              <p>{event.description}</p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Minimum Age:</strong> {event.minimumAge}
              </p>
            </a>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
}
