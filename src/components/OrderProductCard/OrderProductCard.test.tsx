import React from "react";
import {screen} from "@testing-library/react";
import OrderProductCard from "./OrderProductCard";
import {renderWithRouter} from "../../../tests/integration-helpers/renderWithRouter";

describe("Basic tests", () => {
    test("Match snapshot", () => {
        
        renderWithRouter(<OrderProductCard product={{quantity: 1}} selfIndexInCart={0}/>);
        expect(screen.getByTestId("order-product-card")).toMatchSnapshot();
    })
})