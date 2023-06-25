import FormTextField from "./FormTextField";
import {screen} from "@testing-library/react";
import {renderWithFormikContext} from "../../../tests/integration-helpers/renderWithFormikContext";

describe("Basic tests", () => {
    test("Match snapshot", () => {
        renderWithFormikContext(<FormTextField/>);
        expect(screen.getByTestId("form-text-field")).toMatchSnapshot();
    })
})