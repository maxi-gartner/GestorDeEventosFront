import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function DetailsEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/event/" + id)
      .then((res) => res.json())
      .then((data) => setEvent(data.response.data))
      .catch((err) => console.log(err));
  }, []);
  console.log("event", event);

  return (
    <div>
      <h1>{event.name}</h1>
    </div>
  );
}
