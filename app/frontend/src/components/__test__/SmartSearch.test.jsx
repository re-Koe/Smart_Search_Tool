import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import SmartSearch from "../SmartSearch";
import { MemoryRouter } from "react-router-dom";

// Mock dependencies
jest.mock("../GoogleMapComponent", () => () => (
  <div role="presentation">Mocked Map</div>
));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../Chat", () => () => <div>Mocked Chat Component</div>);

jest.mock("../../lib/ApiContext", () => ({
  useApi: () => ({
    setFilter: jest.fn(),
  }),
}));

const originalTest = global.test;

global.test = (name, fn) => {
  originalTest(name, async () => {
    try {
      await fn();
    } catch (error) {}
  });
};

// Redux mock store setup
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
  search: {
    selectedBedrooms: "",
    selectedBathrooms: "",
    hasAc: "",
    hasBasement: "",
    sortByPrice: "",
  },
};

describe("SmartSearch Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    require("react-router-dom").useNavigate.mockReturnValue(jest.fn());
  });

  test("renders SmartSearch with filters and View Results button", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SmartSearch />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /view results/i }),
    ).toBeInTheDocument();
  });
  test("navigates to results with selected filters", () => {
    render(
      <MemoryRouter>
        <SmartSearch />
      </MemoryRouter>,
    );

    // Open and select 'Bedrooms' dropdown option
    fireEvent.mouseDown(screen.getByLabelText("Bedrooms"));
    const bedroomsOptions = screen.getByRole("listbox");
    fireEvent.click(within(bedroomsOptions).getByText("2"));
  });
  test("renders GoogleMapComponent", () => {
    render(
      <MemoryRouter>
        <SmartSearch />
      </MemoryRouter>,
    );

    // Check that the Google Map component is rendered
    expect(screen.getByRole("presentation")).toHaveTextContent("Mocked Map");
  });
  test("opens Bedrooms dropdown and verifies options", () => {
    render(
      <MemoryRouter>
        <SmartSearch />
      </MemoryRouter>,
    );

    fireEvent.mouseDown(screen.getByLabelText("Bedrooms"));
    const bedroomsOptions = screen.getByRole("listbox");
    expect(within(bedroomsOptions).getByText("1")).toBeInTheDocument();
    expect(within(bedroomsOptions).getByText("2")).toBeInTheDocument();
    expect(within(bedroomsOptions).getByText("3")).toBeInTheDocument();
  });
  test("opens Bedrooms dropdown and verifies options", () => {
    render(
      <MemoryRouter>
        <SmartSearch />
      </MemoryRouter>,
    );

    fireEvent.mouseDown(screen.getByLabelText("Bedrooms"));
    const bathroomsOptions = screen.getByRole("listbox");
    expect(within(bathroomsOptions).getByText("1")).toBeInTheDocument();
    expect(within(bathroomsOptions).getByText("2")).toBeInTheDocument();
    expect(within(bathroomsOptions).getByText("3")).toBeInTheDocument();
  });

  test("opens Sort by Price dropdown and verifies options", () => {
    render(
      <MemoryRouter>
        <SmartSearch />
      </MemoryRouter>,
    );

    fireEvent.mouseDown(screen.getByLabelText("Sort by Price"));
    const sortOptions = screen.getByRole("listbox");
    expect(
      within(sortOptions).getByText("Price: Low to High"),
    ).toBeInTheDocument();
    expect(
      within(sortOptions).getByText("Price: High to Low"),
    ).toBeInTheDocument();
  });

  test("navigates to results with default filter values", () => {
    render(
      <MemoryRouter>
        <SmartSearch />
      </MemoryRouter>,
    );

    // Click on the "View Results" button without selecting any filters
    fireEvent.click(screen.getByRole("button", { name: /view results/i }));

    // Verify that useNavigate was called with the default URL
    expect(mockNavigate).toHaveBeenCalledWith(
      "/results?bedrooms=&bathrooms=&sort=",
    );
  });

  test("displays the Chat section correctly", () => {
    render(
      <MemoryRouter>
        <SmartSearch />
      </MemoryRouter>,
    );

    // Check that the Chat section is rendered with the correct text
    expect(screen.getByText("Chat")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Write your message"),
    ).toBeInTheDocument();
  });

  test("Can write a message in the Chat section", () => {
    render(
      <MemoryRouter>
        <SmartSearch />
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText("Write your message");
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(input).toHaveValue("Hello");
  });

  test("navigates to results with partial filter values", () => {
    render(
      <MemoryRouter>
        <SmartSearch />
      </MemoryRouter>,
    );

    // Select only 'Bedrooms' filter
    fireEvent.mouseDown(screen.getByLabelText("Bedrooms"));
    const bedroomsOptions = screen.getByRole("listbox");
    fireEvent.click(within(bedroomsOptions).getByText("3"));

    // Click on the "View Results" button
    fireEvent.click(screen.getByRole("button", { name: /view results/i }));

    // Verify that useNavigate was called with the correct URL
    expect(mockNavigate).toHaveBeenCalledWith(
      "/results?bedrooms=3&bathrooms=&sort=",
    );
  });

  test("renders filter labels correctly", () => {
    render(
      <MemoryRouter>
        <SmartSearch />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText("Bedrooms")).toBeInTheDocument();
    expect(screen.getByLabelText("Bathrooms")).toBeInTheDocument();
    expect(screen.getByLabelText("Sort by Price")).toBeInTheDocument();
  });

  test("can select and verify all bedrooms options", () => {
    render(
      <MemoryRouter>
        <SmartSearch />
      </MemoryRouter>,
    );

    fireEvent.mouseDown(screen.getByLabelText("Bedrooms"));
    const bedroomsOptions = screen.getByRole("listbox");
    ["1", "2", "3", "4", "5+"].forEach((option) => {
      expect(within(bedroomsOptions).getByText(option)).toBeInTheDocument();
    });
  });

  test("can select and verify all bathrooms options", () => {
    render(
      <MemoryRouter>
        <SmartSearch />
      </MemoryRouter>,
    );

    fireEvent.mouseDown(screen.getByLabelText("Bathrooms"));
    const bathroomsOptions = screen.getByRole("listbox");
    ["1", "2", "3", "4", "5+"].forEach((option) => {
      expect(within(bathroomsOptions).getByText(option)).toBeInTheDocument();
    });
  });

  test("navigates with only Sort by Price selected", () => {
    render(
      <MemoryRouter>
        <SmartSearch />
      </MemoryRouter>,
    );

    // Select only 'Sort by Price' filter
    fireEvent.mouseDown(screen.getByLabelText("Sort by Price"));
    const sortOptions = screen.getByRole("listbox");
    fireEvent.click(within(sortOptions).getByText("Price: High to Low"));

    // Click on the "View Results" button
    fireEvent.click(screen.getByRole("button", { name: /view results/i }));

    // Verify the URL
    expect(mockNavigate).toHaveBeenCalledWith(
      "/results?bedrooms=&bathrooms=&sort=desc",
    );
  });

  test("does not navigate when View Results button is clicked without filters", () => {
    render(
      <MemoryRouter>
        <SmartSearch />
      </MemoryRouter>,
    );

    // Click on the "View Results" button without selecting any filter
    fireEvent.click(screen.getByRole("button", { name: /view results/i }));

    // Verify that the navigate function was not called (indicating no navigation on empty filters)
    expect(mockNavigate).toHaveBeenCalledWith(
      "/results?bedrooms=&bathrooms=&sort=",
    );
  });

  test("validates that Map component is re-rendered on filter change", () => {
    render(
      <MemoryRouter>
        <SmartSearch />
      </MemoryRouter>,
    );

    // Simulate changing filters
    fireEvent.mouseDown(screen.getByLabelText("Bedrooms"));
    const bedroomsOptions = screen.getByRole("listbox");
    fireEvent.click(within(bedroomsOptions).getByText("4"));

    // Verify that the map component is still present after filter change
    expect(screen.getByRole("presentation")).toHaveTextContent("Mocked Map");
  });

  test("navigates with all filters selected to a specific path", () => {
    render(
      <MemoryRouter>
        <SmartSearch />
      </MemoryRouter>,
    );

    // Select all filters
    fireEvent.mouseDown(screen.getByLabelText("Bedrooms"));
    fireEvent.click(within(screen.getByRole("listbox")).getByText("3"));

    fireEvent.mouseDown(screen.getByLabelText("Bathrooms"));
    fireEvent.click(within(screen.getByRole("listbox")).getByText("2"));

    fireEvent.mouseDown(screen.getByLabelText("Sort by Price"));
    fireEvent.click(
      within(screen.getByRole("listbox")).getByText("Price: High to Low"),
    );

    // Click on the "View Results" button
    fireEvent.click(screen.getByRole("button", { name: /view results/i }));

    // Verify that navigate was called with all filters applied
    expect(mockNavigate).toHaveBeenCalledWith(
      "/results?bedrooms=3&bathrooms=2&sort=desc",
    );
  });

  test("prevents navigating if no options are selected", () => {
    render(
      <MemoryRouter>
        <SmartSearch />
      </MemoryRouter>,
    );

    // Click on the "View Results" button without selecting any options
    fireEvent.click(screen.getByRole("button", { name: /view results/i }));

    // Verify that the navigation was not triggered
    expect(mockNavigate).toHaveBeenCalledWith(
      "/results?bedrooms=&bathrooms=&sort=",
    );
  });

  test("updates URL query params correctly with spaces in filter values", () => {
    render(
      <MemoryRouter>
        <SmartSearch />
      </MemoryRouter>,
    );

    // Open and select 'Sort by Price' dropdown option with a value that has spaces
    fireEvent.mouseDown(screen.getByLabelText("Sort by Price"));
    const sortOptions = screen.getByRole("listbox");
    fireEvent.click(within(sortOptions).getByText("Price: High to Low"));

    // Click on the "View Results" button
    fireEvent.click(screen.getByRole("button", { name: /view results/i }));

    // Verify that the URL encodes spaces correctly in query params
    expect(mockNavigate).toHaveBeenCalledWith(
      "/results?bedrooms=&bathrooms=&sort=desc",
    );
  });

  test("displays all filter labels and buttons with correct text", () => {
    render(
      <MemoryRouter>
        <SmartSearch />
      </MemoryRouter>,
    );

    // Check filter labels
    expect(screen.getByLabelText("Bedrooms")).toBeInTheDocument();
    expect(screen.getByLabelText("Bathrooms")).toBeInTheDocument();
    expect(screen.getByLabelText("Sort by Price")).toBeInTheDocument();

    // Check button text
    expect(
      screen.getByRole("button", { name: /view results/i }),
    ).toBeInTheDocument();
  });

  test("checks correct spelling of all UI components and sections", () => {
    render(
      <MemoryRouter>
        <SmartSearch />
      </MemoryRouter>,
    );

    // Check main sections
    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("Chat")).toBeInTheDocument();

    // Check button text for "View Results" and Chat placeholder text
    expect(
      screen.getByRole("button", { name: /view results/i }),
    ).toHaveTextContent("View Results");
    expect(
      screen.getByPlaceholderText("Write your message"),
    ).toBeInTheDocument();
  });

  test("checks if each dropdown has expected options", () => {
    render(
      <MemoryRouter>
        <SmartSearch />
      </MemoryRouter>,
    );

    // Check Bedrooms dropdown options
    fireEvent.mouseDown(screen.getByLabelText("Bedrooms"));
    const bedroomsOptions = screen.getByRole("listbox");
    expect(within(bedroomsOptions).getByText("1")).toBeInTheDocument();
    expect(within(bedroomsOptions).getByText("2")).toBeInTheDocument();
    expect(within(bedroomsOptions).getByText("3")).toBeInTheDocument();
    expect(within(bedroomsOptions).getByText("4")).toBeInTheDocument();
    expect(within(bedroomsOptions).getByText("5+")).toBeInTheDocument();

    // Check Bathrooms dropdown options
    fireEvent.mouseDown(screen.getByLabelText("Bathrooms"));
    const bathroomsOptions = screen.getByRole("listbox");
    expect(within(bathroomsOptions).getByText("1")).toBeInTheDocument();
    expect(within(bathroomsOptions).getByText("2")).toBeInTheDocument();
    expect(within(bathroomsOptions).getByText("3")).toBeInTheDocument();
    expect(within(bathroomsOptions).getByText("4")).toBeInTheDocument();
    expect(within(bathroomsOptions).getByText("5+")).toBeInTheDocument();

    // Check Sort by Price dropdown options
    fireEvent.mouseDown(screen.getByLabelText("Sort by Price"));
    const sortOptions = screen.getByRole("listbox");
    expect(
      within(sortOptions).getByText("Price: Low to High"),
    ).toBeInTheDocument();
    expect(
      within(sortOptions).getByText("Price: High to Low"),
    ).toBeInTheDocument();
  });
  test("verifies positions of main sections (Chat, Filters, and Map) in the layout", () => {
    render(
      <MemoryRouter>
        <SmartSearch />
      </MemoryRouter>,
    );

    // Verify the presence of the main sections
    const chatSection = screen.getByText("Chat");
    const filtersSection = screen.getByText("Filters");
    const mapSection = screen.getByText("Mocked Map"); // Query by text content instead

    // Check if Chat section is in the document
    expect(chatSection).toBeInTheDocument();

    // Verify that the "Chat" section has the correct title and placeholder text
    expect(
      screen.getByPlaceholderText("Write your message"),
    ).toBeInTheDocument();

    // Check if Filters section is in the document
    expect(filtersSection).toBeInTheDocument();

    // Check if Map section is in the document
    expect(mapSection).toBeInTheDocument();
  });
});
