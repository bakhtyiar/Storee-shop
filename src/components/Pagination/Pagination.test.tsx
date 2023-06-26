import React from "react";
import {screen} from "@testing-library/react";
import {renderWithRouter} from "../../../tests/integration-helpers/renderWithRouter";
import {Pagination} from "./Pagination";
//todo: write interactive tests
describe("Basic tests", () => {
	test("Match snapshot", () => {

		renderWithRouter(<Pagination pagesAmount={1}/>);
		expect(screen.getByTestId("pagination")).toMatchSnapshot();
	})
})