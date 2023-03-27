import {screen} from "@testing-library/react";
import {renderWithRouter} from "../../tests/helpers/renderWithRouter";
import RegisterForm from "./RegisterForm";
//todo: write interactive tests as for LoginForm component
describe("Basic tests", () => {
    test("Match snapshot", () => {
        renderWithRouter(<RegisterForm/>);
        expect(screen.getByTestId("register-form")).toMatchSnapshot();
    })
})