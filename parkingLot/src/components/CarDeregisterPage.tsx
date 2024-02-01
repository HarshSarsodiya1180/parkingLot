// CarDeregisterPage.tsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { deallocateParkingSpace } from "../store/parkingSlice";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface CarDeregisterPageProps {
  spaceNumber: number;
}

const CarDeregisterPage: React.FC<CarDeregisterPageProps> = ({
  spaceNumber,
}) => {
  const dispatch = useDispatch();
  const carData = useSelector(
    (state: RootState) => state.parking.carData[spaceNumber]
  );
  const allocatedSpaces = useSelector(
    (state: RootState) => state.parking.allocatedSpaces
  );
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const calculateTimeSpent = (): string => {
    const currentTime = Date.now();

    const timeSpentMillis = currentTime - carData?.startTime!;
    const hours = Math.floor(timeSpentMillis / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeSpentMillis % (1000 * 60 * 60)) / (1000 * 60)
    );

    return `${hours} hours and ${minutes} minutes`;
  };

  const currentTime = Date.now();
  const timeSpentMillis = currentTime - carData?.startTime!;
  const timeSpentHours = timeSpentMillis / (1000 * 60 * 60);

  const handlePaymentTaken = () => {
    const parkingCharge = calculateParkingCharge(timeSpentHours);

    fetch("https://httpstat.us/200", {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: JSON.stringify({
        "car-registration": carData?.registration,
        charge: parkingCharge,
      }),
    });
    dispatch(deallocateParkingSpace(spaceNumber));
    handleCloseDialog();
    // toast.success("Payment Successful");
    alert("Payment Successful");
    navigate("/parking-lot");
  };

  const calculateParkingCharge = (timeSpentHours: number): number => {
    const baseCharge = 10;
    const additionalChargePerHour = 10;
    const parkingCharge =
      timeSpentHours <= 2
        ? baseCharge
        : baseCharge + additionalChargePerHour * (timeSpentHours - 2);

    return parkingCharge;
  };

  return (
    <div
      style={{
        // height: "40vh",
        // width: "100vw",
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        // flexDirection: "column",
        gap: "24px",
      }}
    >
      <div
        style={{
          boxShadow: "10px 10px 15px -4px rgba(179,179,179,0.55)",
          padding: "6px",
          borderRadius: "8px",
          maxWidth: "300px",
        }}
      >
        <p>Car Registration: {carData?.registration}</p>
        <p>Time Spent: {calculateTimeSpent()}</p>
        <p>
          Parking Charge: ${calculateParkingCharge(timeSpentHours).toFixed(2)}
        </p>
        <Button
          id="deregister-payment-button"
          variant="contained"
          onClick={handleOpenDialog}
        >
          Payment Taken
        </Button>
        <Button
          id="deregister-back-button"
          variant="contained"
          onClick={() => navigate("/")}
        >
          Back
        </Button>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Payment</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to take the payment?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handlePaymentTaken}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CarDeregisterPage;
