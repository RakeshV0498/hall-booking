import express from "express";
import { rooms } from "../data.js"; // Importing rooms data

const roomRouter = express.Router();

// Endpoint to list all rooms
roomRouter.get("/all", (req, res) => {
  try {
    // Check if there are rooms available
    if (rooms.length === 0) {
      return res.json({
        message: "No rooms to list, please add a room",
      });
    }

    // Return all rooms in JSON format
    return res.json({
      message: "Successfully listed all Rooms",
      data: rooms,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error listing rooms:", error.message);
    return res.status(500).send("Internal Server Error");
  }
});

// Endpoint to add a new room
roomRouter.post("/add", (req, res) => {
  try {
    const roomEntries = req.body;

    // Check if the entry is an array or object
    const newRooms = Array.isArray(roomEntries) ? roomEntries : [roomEntries];

    // Validate each room entry
    for (const room of newRooms) {
      // Check if all the fields are filled
      const { name, seats, amenities, price } = room;
      if (!name || !seats || !amenities || !price) {
        return res
          .status(400)
          .send("Please input all fields: Seats, Amenities, Price");
      }
    }

    // Create a new room object with a unique ID
    newRooms.forEach((room) => {
      const newRoom = {
        id: rooms.length + 1, // Generate a unique ID
        ...room,
      };
      // Add the new room to the rooms array
      rooms.push(newRoom);
    });

    // Send a success response
    return res.json({
      message: "Successfully added rooms",
      data: rooms,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error adding rooms:", error.message);
    return res.status(500).send("Internal Server Error");
  }
});

// Endpoint to update a room
roomRouter.put("/edit/:id", (req, res) => {
  const roomId = parseInt(req.params.id);
  const updatedRoom = req.body;
  console.log(roomId);
  const roomIndex = rooms.findIndex((room) => room.id === roomId);

  if (roomIndex === -1) {
    return res.status(404).send("Room not found");
  }

  const { name, seats, amenities, price } = updatedRoom;
  if (!name || !seats || !amenities || !price) {
    return res
      .status(400)
      .send("Please input all fields: Name, Seats, Amenities, Price");
  }

  rooms[roomIndex] = { id: roomId, ...updatedRoom };

  return res.json({
    message: "Successfully updated the room",
    data: rooms[roomIndex],
  });
});

// Endpoint to delete a room
roomRouter.delete("/delete/:id", (req, res) => {
  const roomId = parseInt(req.params.id);

  const roomIndex = rooms.findIndex((room) => room.id === roomId);

  if (roomIndex === -1) {
    return res.status(404).send("Room not found");
  }

  const deletedRoom = rooms.splice(roomIndex, 1);

  return res.json({
    message: "Successfully deleted the room",
    data: deletedRoom[0],
  });
});

export default roomRouter;
