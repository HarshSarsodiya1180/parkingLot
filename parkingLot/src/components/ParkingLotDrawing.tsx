// ParkingLotDrawing.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import CarDeregisterPage from "./CarDeregisterPage";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { allocateParkingSpace } from "../store/parkingSlice";

const ParkingLotDrawing: React.FC = () => {
  const dispatch = useDispatch();
  const spaces = useSelector((state: RootState) => state.parking.spaces);
  const allocatedSpaces = useSelector(
    (state: RootState) => state.parking.allocatedSpaces
  );

  const [openDialog, setOpenDialog] = useState(false);
  const [carRegistration, setCarRegistration] = useState("");
  const [selectedSpace, setSelectedSpace] = useState<number | null>(null);

  const handleAddCar = (space: number) => {
    setOpenDialog(true);
    setSelectedSpace(space);
  };

  const handleConfirmAddCar = () => {
    const randomAvailableSpace = getRandomAvailableSpace();
    if (randomAvailableSpace !== undefined) {
      dispatch(
        allocateParkingSpace({
          space: randomAvailableSpace,
          registration: carRegistration,
          startTime: Date.now(),
        })
      );
      setOpenDialog(false);
    } else {
      // Handle case when no available space is found
      alert("Parking is full!");
    }
  };

  const getRandomAvailableSpace = () => {
    const availableSpaces = Array.from(
      { length: spaces },
      (_, i) => i + 1
    ).filter((space) => !allocatedSpaces.includes(space));

    return availableSpaces.length > 0
      ? availableSpaces[Math.floor(Math.random() * availableSpaces.length)]
      : undefined;
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
      {/* Render parking spaces */}
      {Array.from({ length: spaces }, (_, i) => i + 1).map((space) => (
        <React.Fragment key={space}>
          {allocatedSpaces.includes(space) ? (
            <CarDeregisterPage spaceNumber={space} />
          ) : (
            <Button
              id={`parking-drawing-space-${space}`}
              variant="contained"
              onClick={() => handleAddCar(space)}
            >
              Empty
            </Button>
          )}
        </React.Fragment>
      ))}

      {/* Dialog for adding a new car */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Car</DialogTitle>
        <DialogContent>
          <TextField
            id="parking-drawing-registration-input"
            label="Car Registration"
            value={carRegistration}
            onChange={(e) => setCarRegistration(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmAddCar}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ParkingLotDrawing;
