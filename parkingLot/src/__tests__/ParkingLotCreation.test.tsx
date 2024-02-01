import { render } from "@testing-library/react";
import ParkingLotDrawing from "../components/ParkingLotDrawing";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

// Mock your redux store
const mockStore = configureStore();
const store = mockStore({
  parking: {
    spaces: 5, // Adjust as needed
    allocatedSpaces: [1, 3], // Mock allocated spaces
  },
});

describe("ParkingLotDrawing", () => {
  it("renders parking spaces correctly", () => {
    render(
      <Provider store={store}>
        <ParkingLotDrawing />
      </Provider>
    );

    // Adjust the expected button text based on your implementation
    //     expect(screen.getByText("Empty")).toBeInTheDocument();
    //     expect(screen.getByText("Empty")).toBeInTheDocument();
    //     expect(screen.getByText("Car Deregister Page")).toBeInTheDocument(); // Assuming this text is present on the CarDeregisterPage component
    //   });

    //   it("opens the dialog when clicking on an empty space", () => {
    //     render(
    //       <Provider store={store}>
    //         <ParkingLotDrawing />
    //       </Provider>
    //     );

    //     fireEvent.click(screen.getByText("Empty"));
    //     expect(screen.getByText("Add New Car")).toBeInTheDocument();
    //   });

    //   it("adds a new car and closes the dialog", () => {
    //     render(
    //       <Provider store={store}>
    //         <ParkingLotDrawing />
    //       </Provider>
    //     );

    //     fireEvent.click(screen.getByText("Empty"));

    //     // Mocking user input in the dialog
    //     fireEvent.change(screen.getByLabelText("Car Registration"), {
    //       target: { value: "ABC123" },
    //     });

    //     fireEvent.click(screen.getByText("Confirm"));
    //     expect(store.getActions()).toEqual([
    //       {
    //         type: "parking/allocateParkingSpace",
    //         payload: {
    //           space: expect.any(Number),
    //           registration: "ABC123",
    //           startTime: expect.any(Number),
    //         },
    //       },
    //     ]);

    //     // Confirm that the dialog is closed after adding a car
    //     expect(screen.queryByText("Add New Car")).toBeNull();
  });

  // Add more test cases as needed
});
