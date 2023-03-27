import {screen} from "@testing-library/react";
import {renderWithFormikContext} from "../../tests/helpers/renderWithFormikContext";
import FormArrayField from "./FormArrayField";

describe("Basic tests", () => {
    test("Empty field", () => {
        renderWithFormikContext(<FormArrayField arr={[]}/>);
        expect(screen.getByTestId("add-item")).toBeInTheDocument();
    })
})