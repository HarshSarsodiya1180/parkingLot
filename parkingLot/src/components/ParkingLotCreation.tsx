// ParkingLotCreation.tsx
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setParkingSpaces } from "../store/parkingSlice";
import { Navigate, useNavigate } from "react-router-dom";

const ParkingLotCreation: React.FC = () => {
  const dispatch = useDispatch(); // Import the useDispatch hook
  const [spaces, setSpaces] = useState<number>(0);

  const handleSpacesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpaces(Number(e.target.value));
  };

  const navigate = useNavigate();
  const handleCreateParkingLot = () => {
    dispatch(setParkingSpaces(spaces)); // Dispatch setParkingSpaces action
    // setSpaces(" ");
    // console.log("Message");
    navigate("/parking-lot");
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <TextField
        id="parking-create-text-input"
        label="Number of spaces"
        type="number"
        value={spaces}
        onChange={handleSpacesChange}
      />
      <Button
        id="parking-create-submit-button"
        variant="contained"
        onClick={handleCreateParkingLot}
      >
        Create Parking Lot
      </Button>
    </div>
  );
};

export default ParkingLotCreation;
