import { render, screen, fireEvent } from "@testing-library/react";
import InitialPage from "../pages/index.jsx";
const pushMock = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("InitialPage navigation", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  test("should navigate to /customizer when clicking the button", () => {
    render(<InitialPage />);
    const button = screen.getByText("Customizar personagem");
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith("/customizer");
  });

  test("should navigate to /randomizer when clicking the button", () => {
    render(<InitialPage />);
    const button = screen.getByText("Criar personagem aleatório");
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith("/randomizer");
  });
});
