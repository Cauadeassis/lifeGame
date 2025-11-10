import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../components/header";
const pushMock = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("Header navigation", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  test("should navigate to /index.jsx when clicking the button", () => {
    render(<Header />);
    const h1 = screen.getByText("Vida Eletrônica");
    fireEvent.click(h1);

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith("/");
  });
});