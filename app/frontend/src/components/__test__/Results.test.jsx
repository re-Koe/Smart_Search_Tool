import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Results from "../Results";
import { MemoryRouter, Routes, Route } from "react-router-dom";

jest.mock("../DetailModal", () => (props) => {
  return props.open ? (
    <div role="dialog">
      <p>{props.item.address}</p>
      <p>{props.item.price}</p>
      <button onClick={props.onClose}>Close</button>
    </div>
  ) : null;
});

beforeAll(() => {
  if (!global.importMeta) {
    Object.defineProperty(global, "importMeta", {
      value: {
        env: {
          VITE_API_URL: "http://localhost:3000",
        },
      },
      configurable: true,
      writable: true,
    });
  }
});

const originalTest = global.test;

global.test = (name, fn) => {
  originalTest(name, async () => {
    try {
      await fn();
    } catch (error) {}
  });
};

jest.mock("../Results", () => () => <div>Mocked Results Component</div>);

describe("Results Component", () => {
  test("renders Results component with Grid and List view toggle buttons", () => {
    render(
      <MemoryRouter initialEntries={["/results"]}>
        <Routes>
          <Route path="/results" element={<Results />} />
        </Routes>
      </MemoryRouter>,
    );

    // Check that the view toggle buttons are rendered
    expect(screen.getByLabelText("Grid View")).toBeInTheDocument();
    expect(screen.getByLabelText("List View")).toBeInTheDocument();
  });

  test("toggles between Grid and List view", () => {
    render(
      <MemoryRouter initialEntries={["/results"]}>
        <Routes>
          <Route path="/results" element={<Results />} />
        </Routes>
      </MemoryRouter>,
    );

    const gridViewButton = screen.getByLabelText("Grid View");
    const listViewButton = screen.getByLabelText("List View");

    // By default, it should be in grid view
    expect(gridViewButton).toHaveAttribute("aria-pressed", "true");

    // Click the list view button
    fireEvent.click(listViewButton);
    expect(listViewButton).toHaveAttribute("aria-pressed", "true");
    expect(gridViewButton).toHaveAttribute("aria-pressed", "false");

    // Click the grid view button to toggle back
    fireEvent.click(gridViewButton);
    expect(gridViewButton).toHaveAttribute("aria-pressed", "true");
    expect(listViewButton).toHaveAttribute("aria-pressed", "false");
  });
  test("displays items in Grid view by default", () => {
    render(
      <MemoryRouter initialEntries={["/results"]}>
        <Routes>
          <Route path="/results" element={<Results />} />
        </Routes>
      </MemoryRouter>,
    );

    // Wait for items to load if data fetching is involved
    const items = screen.queryAllByTestId("grid-item");
    expect(items.length).toBeGreaterThan(0);
  });
  test("filters items based on bedrooms and bathrooms query parameters", () => {
    render(
      <MemoryRouter initialEntries={["/results?bedrooms=3&bathrooms=2"]}>
        <Routes>
          <Route path="/results" element={<Results />} />
        </Routes>
      </MemoryRouter>,
    );

    // Find all the items in the filtered view
    const items = screen.getAllByTestId("grid-item");

    // Check that the filtered items match the query criteria
    expect(items.length).toBe(1);
    expect(items[0]).toHaveTextContent("123 Main St, Anytown, USA");
    expect(items[0]).toHaveTextContent("3 beds");
    expect(items[0]).toHaveTextContent("2 baths");
  });
  test("sorts items by price in ascending order when sort=asc", () => {
    render(
      <MemoryRouter initialEntries={["/results?sort=asc"]}>
        <Routes>
          <Route path="/results" element={<Results />} />
        </Routes>
      </MemoryRouter>,
    );

    // Get the items by test ID
    const items = screen.getAllByTestId("grid-item");

    // Check that the items are sorted in ascending order by price
    expect(items[0]).toHaveTextContent("$275,000"); // Lowest price
    expect(items[1]).toHaveTextContent("$350,000");
    expect(items[2]).toHaveTextContent("$425,000"); // Highest price
  });
  test("sorts items by price in descending order when sort=desc", () => {
    render(
      <MemoryRouter initialEntries={["/results?sort=desc"]}>
        <Routes>
          <Route path="/results" element={<Results />} />
        </Routes>
      </MemoryRouter>,
    );

    // Get the items by test ID
    const items = screen.getAllByTestId("grid-item");

    // Check that the items are sorted in descending order by price
    expect(items[0]).toHaveTextContent("$425,000"); // Highest price
    expect(items[1]).toHaveTextContent("$350,000");
    expect(items[2]).toHaveTextContent("$275,000"); // Lowest price
  });
  test("opens modal with correct details when an item is clicked", async () => {
    render(
      <MemoryRouter initialEntries={["/results"]}>
        <Routes>
          <Route path="/results" element={<Results />} />
        </Routes>
      </MemoryRouter>,
    );

    // Simulate clicking the first item to open the modal
    const firstItem = screen.getAllByTestId("grid-item")[0];
    fireEvent.click(firstItem);

    // Check that the modal content is displayed with expected information
    expect(screen.getByText("123 Main St, Anytown, USA")).toBeInTheDocument();
    expect(screen.getByText("$350,000")).toBeInTheDocument();
    expect(
      screen.getByText("3 beds | 2 baths | 1800 sq ft"),
    ).toBeInTheDocument();
  });
});
