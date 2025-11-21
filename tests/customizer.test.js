import { render, screen, fireEvent } from "@testing-library/react";
import Customizer from "../pages/customizer";
import "@testing-library/jest-dom";
const pushMock = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));
describe("Customizer form validation", () => {
  beforeEach(() => {
    Storage.prototype.setItem = jest.fn();
    pushMock.mockClear();
  });
  test("Should not start game when a field is not filled", () => {
    render(<Customizer />);
    const startButton = screen.getByText("Vamos jogar");
    fireEvent.click(startButton);
    expect(screen.getByText("Preencha todos os campos!")).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
  test("Should start game when all fields are filled", () => {
    render(<Customizer />);
    fireEvent.change(screen.getByPlaceholderText("Digite seu nome"), {
      target: { value: "Victor" },
    });
    fireEvent.change(screen.getByLabelText("País de Origem"), {
      target: { value: "BR" },
    });
    fireEvent.change(screen.getByLabelText("Gênero"), {
      target: { value: "male" },
    });
    const startButton = screen.getByText("Vamos jogar");
    fireEvent.click(startButton);
    expect(screen.queryByText("Preencha todos os campos!")).toBeNull();
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith("/game");
  });
});