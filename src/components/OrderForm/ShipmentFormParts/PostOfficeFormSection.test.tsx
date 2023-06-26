import React from "react";
import {screen} from "@testing-library/react";
import {renderWithFormikContext} from "../../../../tests/integration-helpers/renderWithFormikContext";
import PostOfficeFormSection from "./PostOfficeFormSection";

describe("Basic tests", () => {
    test("Match snapshot", () => {
        
        renderWithFormikContext(<PostOfficeFormSection/>);
        expect(screen.getByTestId("post-office-form-section")).toMatchSnapshot();
    })
})