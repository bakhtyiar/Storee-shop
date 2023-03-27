import {screen} from "@testing-library/react";
import {renderWithFormikContext} from "../../tests/helpers/renderWithFormikContext";
import FormSelectField from "./FormSelectField";

describe("Basic tests", () => {
    test("Match snapshot", () => {
        renderWithFormikContext(<FormSelectField/>);
        expect(screen.getByTestId("form-select-field")).toMatchSnapshot();
    })
})