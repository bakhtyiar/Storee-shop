import {screen} from "@testing-library/react";
import {renderWithRouter} from "../../tests/helpers/renderWithRouter";
import {Pagination} from "./Pagination";
//todo: write interactive tests
describe("Basic tests", () => {
	test("Match snapshot", () => {
		renderWithRouter(<Pagination/>);
		expect(screen.getByTestId("pagination")).toMatchSnapshot();
	})
})