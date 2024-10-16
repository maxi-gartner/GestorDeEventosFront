import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import eventQueries from "../services/eventQueries";
import Swal from "sweetalert2";
import alert from "../services/alerts/swalAlert";
import encryption from "../../encryption";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("");

  if (events.length === 0) {
    alert.loading("Searching for available events...");
  }

  if (events.length > 0) {
    Swal.close();
  }

  useEffect(() => {
    eventQueries.getAllEvents().then(setEvents);
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredEvents = events.filter((event) => {
    const regex = new RegExp(filter.trim().replace(/\s+/g, "\\s+"), "i");
    return regex.test(event.name) || regex.test(event.description);
  });

  return (
    <div>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search events by name..."
          value={filter}
          onChange={handleFilterChange}
          className="sm:w-[50%] p-2 mb-5 mt-2 rounded-md min-w-80"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => {
            const encryptedId = encryption.encrypt(event.id);
            return (
              <Link
                to={`/event/${encryptedId}`}
                key={index}
                className="mb-4 flex flex-col gap-1 py-2 border-t border-white sm:w-96"
              >
                <h2 className="text-lg font-semibold mb-2 w-full text-center">
                  {event.name}
                </h2>
                <img
                  src={event.photo}
                  alt={event.name}
                  className="w-full max-h-[200px] object-cover sm:h-60 hover:shadow-xl hover:shadow-black/30"
                  onError={(e) =>
                    (e.target.src =
                      "https://static.vecteezy.com/system/resources/previews/004/435/751/non_2x/404-error-page-with-black-cat-illustrations-not-found-system-updates-uploading-operation-computing-installation-programs-vector.jpg")
                  }
                />
                <p>{event.description}</p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Minimum Age:</strong> {event.minimumAge}
                </p>
              </Link>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
