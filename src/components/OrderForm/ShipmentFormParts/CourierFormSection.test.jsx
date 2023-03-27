import CourierFormSection from "./CourierFormSection";
import {screen} from "@testing-library/react";
import {renderWithFormikContext} from "../../../tests/helpers/renderWithFormikContext";

describe("Basic tests", () => {
    test("Match snapshot", () => {
        renderWithFormikContext(<CourierFormSection/>);
        expect(screen.getByTestId("courier-form-section")).toMatchSnapshot();
    })
})