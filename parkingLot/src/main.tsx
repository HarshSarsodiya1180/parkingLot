// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ParkingLotCreation from "./components/ParkingLotCreation";
import ParkingLotDrawing from "./components/ParkingLotDrawing";
import { ToastContainer } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux"; // Import Provider from react-redux
import store from "./store";

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        {/* {" "} */}
        <Router>
          <Routes>
            <Route path="/" element={<ParkingLotCreation />} />
            <Route path="/parking-lot" element={<ParkingLotDrawing />} />
          </Routes>
        </Router>
        <ToastContainer />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

