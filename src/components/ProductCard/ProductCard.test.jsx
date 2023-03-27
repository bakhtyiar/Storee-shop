import {screen} from "@testing-library/react";
import {renderWithRouter} from "../../tests/helpers/renderWithRouter";
import ProductCard from "./ProductCard";
//todo: write interactive tests
describe("Basic tests", () => {
    test("Match snapshot", () => {
        renderWithRouter(<ProductCard item={{id: 123, }}/>);
        expect(screen.getByTestId("product-card")).toMatchSnapshot();
    })
})