import React, { useState } from "react";
import html2canvas from "html2canvas";
import "./App.css";

function App() {
  const [details, setDetails] = useState({
    bride: "",
    groom: "",
    venue: "",
    date: "",
    time: "12:00", // Default time in 12-hour format
  });

  const [draggedItem, setDraggedItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item
  const [positions, setPositions] = useState({
    bride: { x: 100, y: 50, fontSize: 30, type: "text" },
    groom: { x: 300, y: 50, fontSize: 30, type: "text" },
    venue: { x: 100, y: 200, fontSize: 20, type: "text" },
    date: { x: 100, y: 300, fontSize: 20, type: "text" },
    time: { x: 100, y: 350, fontSize: 20, type: "text" },
    bridePhoto: { x: 50, y: 100, size: 100, type: "photo" },
    groomPhoto: { x: 250, y: 100, size: 100, type: "photo" },
  });

  const [photos, setPhotos] = useState({ bridePhoto: null, groomPhoto: null });

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotos((prev) => ({ ...prev, [type]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragStart = (item, e) => {
    e.preventDefault(); // Prevent default behavior to avoid issues with mobile drag events
    setDraggedItem(item);
  };

  const handleDrag = (e) => {
    if (!draggedItem) return;

    const card = document.getElementById("card");
    const { left, top, width, height } = card.getBoundingClientRect();

    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    if (clientX === undefined || clientY === undefined) return;

    const x = Math.min(
      Math.max(clientX - left, 0),
      width - (draggedItem.includes("Photo") ? positions[draggedItem].size : 10)
    );
    const y = Math.min(
      Math.max(clientY - top, 0),
      height - (draggedItem.includes("Photo") ? positions[draggedItem].size : 10)
    );

    setPositions((prev) => ({
      ...prev,
      [draggedItem]: {
        ...prev[draggedItem],
        x,
        y,
      },
    }));
  };

  const handleDrop = () => setDraggedItem(null);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleResize = (delta) => {
    if (!selectedItem) return;

    const updatedPositions = { ...positions };
    const item = updatedPositions[selectedItem];

    if (item.type === "text") {
      item.fontSize = Math.max(10, item.fontSize + delta);
    } else if (item.type === "photo") {
      item.size = Math.max(50, item.size + delta);
    }

    setPositions(updatedPositions);
  };

  const formatDate = (date) => {
    if (!date) return "";
    const options = { day: "numeric", month: "long" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    let formattedHour = parseInt(hour, 10);
    let ampm = "AM";

    if (formattedHour >= 12) {
      ampm = "PM";
      if (formattedHour > 12) {
        formattedHour -= 12;
      }
    } else if (formattedHour === 0) {
      formattedHour = 12; // Midnight case
    }

    return `${formattedHour}:${minute} ${ampm}`;
  };

  const handleDownload = () => {
    const cardElement = document.getElementById("card");
    html2canvas(cardElement).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "wedding_card.png";
      link.click();
    });
  };

  return (
    <div className="App" onMouseMove={handleDrag} onMouseUp={handleDrop} onTouchMove={handleDrag} onTouchEnd={handleDrop}>
      <h1>Wedding Card Maker</h1>
      <div className="input-section">
        <input
          type="text"
          name="bride"
          placeholder="Bride's Name"
          value={details.bride}
          onChange={handleDetailChange}
        />
        <input
          type="text"
          name="groom"
          placeholder="Groom's Name"
          value={details.groom}
          onChange={handleDetailChange}
        />
        <input
          type="text"
          name="venue"
          placeholder="Venue"
          value={details.venue}
          onChange={handleDetailChange}
        />
        <input
          type="date"
          name="date"
          value={details.date}
          onChange={handleDetailChange}
        />
        <input
          type="time"
          name="time"
          value={details.time}
          onChange={handleDetailChange}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handlePhotoUpload(e, "bridePhoto")}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handlePhotoUpload(e, "groomPhoto")}
        />
      </div>

      <div id="card" className="card-template">
        {Object.keys(details).map((key) => (
          key !== "contact" && (
            <div
              key={key}
              className="draggable-item"
              style={{
                left: positions[key].x,
                top: positions[key].y,
                fontSize: `${positions[key].fontSize}px`,
              }}
              onMouseDown={(e) => handleDragStart(key, e)}
              onTouchStart={(e) => handleDragStart(key, e)} // Handle touch events
              onClick={() => handleSelectItem(key)} // Select item when clicked
            >
              {key === "date"
                ? formatDate(details[key])
                : key === "time"
                ? formatTime(details[key]) // Display time in 12-hour format with AM/PM
                : details[key]}
            </div>
          )
        ))}

        {["bridePhoto", "groomPhoto"].map((key) => (
          photos[key] && (
            <img
              key={key}
              src={photos[key]}
              alt={key}
              className="draggable-item photo"
              style={{
                left: positions[key].x,
                top: positions[key].y,
                width: `${positions[key].size}px`,
                height: `${positions[key].size}px`,
                borderRadius: "50%",
                objectFit: "cover",
              }}
              onMouseDown={(e) => handleDragStart(key, e)}
              onTouchStart={(e) => handleDragStart(key, e)} // Handle touch events
              onClick={() => handleSelectItem(key)} // Select item when clicked
            />
          )
        ))}
      </div>

      <div className="controls">
        <button onClick={() => handleResize(5)}>Increase Size</button>
        <button onClick={() => handleResize(-5)}>Decrease Size</button>
      </div>

      <button onClick={handleDownload}>Download Card</button>
    </div>
  );
}

export default App;
