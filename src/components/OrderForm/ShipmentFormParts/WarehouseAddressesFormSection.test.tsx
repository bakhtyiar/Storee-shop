import {screen} from "@testing-library/react";
import {renderWithFormikContext} from "../../../../tests/integration-helpers/renderWithFormikContext";
import WarehouseAddressesFormSection from "./WarehouseAddressesFormSection";

describe("Basic tests", () => {
    test("Match snapshot", () => {
        renderWithFormikContext(<WarehouseAddressesFormSection/>);
        expect(screen.getByTestId("warehouse-addresses-form-section")).toMatchSnapshot();
    })
})