import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import eventQueries from "../services/eventQueries";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import alert from "../services/alerts/swalAlert";
import { useSelector } from "react-redux";
import encryption from "../../encryption";

export default function DetailsEvent() {
  const navigate = useNavigate();
  let { id } = useParams();
  const user = useSelector((state) => state.user.userData);
  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userVoted, setUserVoted] = useState(false);
  const [userComents, setUserComments] = useState(false);
  const [vote, setVote] = useState(null);
  id = encryption.decrypt(id);

  useEffect(() => {
    eventQueries.getEvent(id).then(setEvent);
    eventQueries.isRegistered(id).then(setIsRegistered);
  }, [id]);
  useEffect(() => {
    if (event && event.rating && event.rating.voters) {
      const userVoterEmails = event.rating.voters.map((voter) => {
        setVote(voter.vote);
        return voter.userId.email;
      });
      if (userVoterEmails.includes(user.email)) {
        setUserVoted(true);
      }
    }

    if (event && event.comments) {
      const userCommentEmails = event.comments.map((comment) => {
        return comment.userId.email;
      });
      if (userCommentEmails.includes(user.email)) {
        setUserComments(true);
      }
    }
  }, [event, user]);

  async function registerToEvent(id) {
    try {
      alert.loading("Registering for event...");
      const response = await eventQueries.registerToEvent(id);
      if (response.data.success === true) {
        Swal.close();
        alert.success(response.data.message, () => {
          setIsRegistered(true);
        });
      } else {
        if (response.data.success === false) {
          Swal.close();
          alert.error(response.data.message);
        } else {
          Swal.close();
          alert.error(response.data.message, () => {
            navigate("/signin");
          });
        }
      }
    } catch {
      Swal.close();
      alert.error("Error registering for event");
    }
  }
  /* VOTOS */
  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };
  const submitRating = async () => {
    alert.loading("Submitting rating...");
    try {
      const body = {
        vote: rating,
      };
      const response = await eventQueries.submitRating(body, id);
      if (response.success === true) {
        setEvent(response.response.data);
        alert.success(response.message);
      } else {
        Swal.close();
        alert.error(response.message);
      }
    } catch (error) {
      Swal.close();
      alert.error(error.response.data.message);
    }
  };
  /* COMENTARIOS */
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const submitComment = async () => {
    alert.loading("Submitting comment...");
    try {
      const body = {
        comment: comment,
      };
      const response = await eventQueries.submitComment(body, id);
      if (response.success === true) {
        setEvent(response.response.data);
        Swal.close();
        alert.success(response.message);
        setComment("");
      } else {
        Swal.close();
        alert.error("You need to confirm your attendance to comment.");
      }
    } catch {
      Swal.close();
      alert.error("Error submitting comment");
    }
  };

  const capitalizeWords = (str) => {
    if (!str) return ""; // Manejo de cadena vacía o undefined
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (!event) {
    alert.loading("Loading event...");
    return <></>;
  }
  if (event) {
    Swal.close();
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col justify-center items-center mb-6">
        <h1 className="text-3xl font-bold text-center">{event.name}</h1>
        <button
          onClick={() => registerToEvent(event.id)}
          {...(isRegistered && { disabled: true })}
          className={`text-black font-bold py-2 px-4 rounded-3xl mt-4 relative  ${
            isRegistered
              ? "bg-green-500"
              : "bg-blue-500 hover:bg-blue-700 hover:text-white group transform transition-transform duration-200"
          } `}
        >
          <span className="flex items-center justify-between w-full">
            <span>
              {isRegistered
                ? "You are already registered for this event"
                : "Register for the event"}
            </span>
            {isRegistered ? (
              <span className="text-lg transform group-hover:scale-125 ml-2">
                🥳
              </span>
            ) : (
              <i className="fas fa-hand-pointer fa-lg transform group-hover:scale-125 text-white ml-4 -rotate-45"></i>
            )}
          </span>
        </button>
      </div>

      {/* Event Photo */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <img
          src={event.photo}
          alt={event.name}
          className="w-full sm:w-1/2 max-h-96 object-cover rounded-lg"
          onError={(e) =>
            (e.target.src =
              "https://static.vecteezy.com/system/resources/previews/004/435/751/non_2x/404-error-page-with-black-cat-illustrations-not-found-system-updates-uploading-operation-computing-installation-programs-vector.jpg")
          }
        />
        <div className="sm:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
          <p className="mb-2">
            <strong>Fecha:</strong> {new Date(event.date).toLocaleDateString()}{" "}
            {new Date(event.date).toLocaleTimeString()}
          </p>
          <p className="mb-2">
            <strong>Minimum Age:</strong> {event.minimumAge} years
          </p>
          <p className="mb-4">
            <strong>Description:</strong> {event.description}
          </p>
        </div>
      </div>

      {/* Place Details */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Event Location</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <img
            src={event.place.photo}
            alt={event.place.name}
            className="w-full sm:w-1/2 max-h-96 object-cover rounded-lg"
            onError={(e) =>
              (e.target.src =
                "https://static.vecteezy.com/system/resources/previews/004/435/751/non_2x/404-error-page-with-black-cat-illustrations-not-found-system-updates-uploading-operation-computing-installation-programs-vector.jpg")
            }
          />
          <div className="sm:w-1/2">
            <p className="mb-2">
              <strong>Name:</strong> {event.place.name}
            </p>
            <p className="mb-2">
              <strong>Address:</strong> {event.place.address}
            </p>
            <p className="mb-2">
              <strong>Capacity:</strong> {event.place.ocupancy} people
            </p>
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto p-6">
        {/* Sección para votar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-5">
            {!userVoted ? (
              <div>
                <label
                  htmlFor="rating"
                  className="text-lg font-medium text-gray-100"
                >
                  Rate the event (1-10):{" "}
                </label>
                <select
                  id="rating"
                  value={rating}
                  onChange={handleRatingChange}
                  className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                >
                  <option value={0} disabled>
                    Select a rating
                  </option>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <></>
            )}
            <button
              onClick={submitRating}
              disabled={userVoted}
              className={`${
                userVoted
                  ? "bg-green-600 text-white px-5 py-2 rounded-md shadow-sm"
                  : "bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow-sm transition duration-200"
              }`}
            >
              {userVoted ? `Your vote has been a ${vote}!` : "Submit Rating"}
            </button>
          </div>
        </div>

        {/* Formulario de comentarios */}
        {!userComents ? (
          <div>
            <div className="mb-6">
              <label
                htmlFor="comment"
                className="block text-lg font-medium text-gray-300 mb-2"
              >
                Add a comment:
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={handleCommentChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                placeholder="Write your comment here..."
              />
            </div>
            <button
              onClick={submitComment}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md shadow-sm transition duration-200 w-full"
            >
              Submit Comment
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>

      {/* despliegue de informaciom */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
        <p>
          <strong>Organizer:</strong> {capitalizeWords(event.organizer.name)}{" "}
          {capitalizeWords(event.organizer.lastname)}
        </p>
        <p>
          <strong>Rating:</strong>{" "}
          {event.rating.totalRatings > 0
            ? `${event.rating.totalRatings.toFixed(2)} stars`
            : "No ratings"}
        </p>
        <div className="">
          <h2 className="text-xl font-semibold mt-4">Comments:</h2>
          {event.comments.length > 0 ? (
            event.comments.map((comment) => (
              <div
                key={comment._id}
                className="comment-item flex items-center gap-4 mb-4 p-4 pl-0"
              >
                <img
                  src={comment.userId.photo}
                  alt={`${comment.userId.name}`}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) =>
                    (e.target.src =
                      "https://static.vecteezy.com/system/resources/previews/004/435/751/non_2x/404-error-page-with-black-cat-illustrations-not-found-system-updates-uploading-operation-computing-installation-programs-vector.jpg")
                  }
                />
                <div>
                  <p className="font-bold text-lg">
                    {capitalizeWords(comment.userId.name)}{" "}
                    {capitalizeWords(comment.userId.lastname)}
                  </p>
                  <p className="text-gray-100">{comment.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
