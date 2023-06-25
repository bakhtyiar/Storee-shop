import {act, screen, waitFor} from "@testing-library/react";
import LoginForm from "./LoginForm";
import {renderWithRouter} from "../../../tests/integration-helpers/renderWithRouter";
import userEvent from "@testing-library/user-event";

describe("Basic tests", () => {
    test("Match snapshot", () => {
        renderWithRouter(<LoginForm/>);
        expect(screen.getByTestId("login-form")).toMatchSnapshot();
    })
})

describe("formik tests", () => {
    test("valid data", async () => {
        const handleSubmit = jest.fn(x => x);
        renderWithRouter(<LoginForm handleSubmit={handleSubmit}/>, "/someRandomRoute123");
        let loginField = screen.getByRole("textbox", {name: /name/i});
        await userEvent.type(loginField, "kminchelle");
        let passwordField = screen.getByText(/pass/i);
        await userEvent.type(passwordField, "0lelplR");
        let submitButton = screen.getByRole("button", {name: /login/i});
        await userEvent.click(submitButton);
        await waitFor(() => {
            expect(handleSubmit).toBeCalled();
        })
        await waitFor(() => {
            expect(handleSubmit.mock.results[0].value).toEqual(expect.objectContaining({
                username: "kminchelle",
                password: "0lelplR",
                forgetSession: false,
            }));
        })
    })
    test("no data", async () => {
        const handleSubmit = jest.fn(x => x);
        renderWithRouter(<LoginForm handleSubmit={handleSubmit}/>, "/someRandomRoute123");
        let submitButton = screen.getByRole("button", {name: /login/i});
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            await userEvent.click(submitButton);
        })
        await waitFor(() => {
            expect(handleSubmit).not.toBeCalled();
        })
    })
    test("invalid data", async () => {
        const handleSubmit = jest.fn(x => x);
        renderWithRouter(<LoginForm handleSubmit={handleSubmit}/>, "/someRandomRoute123");
        let loginField = screen.getByRole("textbox", {name: /name/i});
        await userEvent.type(loginField, "k");
        let passwordField = screen.getByText(/pass/i);
        await userEvent.type(passwordField, "0l");
        let submitButton = screen.getByRole("button", {name: /login/i});
        await userEvent.click(submitButton);
        await waitFor(() => {
            expect(handleSubmit).not.toBeCalled();
        })
    })
})
