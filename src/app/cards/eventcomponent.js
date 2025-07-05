export default function EventCard({ event }) {

  console.log("EVENT DATA:", event);

  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split("-");
    return new Date(`${year}-${month}-${day}`);
  };

  const formattedDate = parseDate(event["Date"]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 transition hover:scale-105 duration-300">
      <h2 className="text-2xl font-bold text-blue-600">{event["Event Name"]}</h2>
      <p className="text-gray-700 mt-2">{event["Description"]}</p>
      <p className="text-sm text-gray-500 mt-1">
        {formattedDate ? formattedDate.toLocaleDateString() : "Invalid Date"}
      </p>

      {event["Image Url"] && (
        <div className="mt-4">
          <img
            src={event["Image Url"]}
            alt="Event"
            className="h-32 w-48 object-cover rounded"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>
      )}
    </div>
  );
}

