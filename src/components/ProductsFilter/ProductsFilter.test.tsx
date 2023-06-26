import React from "react";
import {screen} from "@testing-library/react";
import {renderWithRouter} from "../../../tests/integration-helpers/renderWithRouter";
import ProductsFilter from "./ProductsFilter";
//todo: write interactive tests
describe("Basic tests", () => {
    test("Match snapshot", () => {
        
        renderWithRouter(<ProductsFilter/>);
        expect(screen.getByTestId("products-filter")).toMatchSnapshot();
    })
})