import React from "react";
import {render, screen} from "@testing-library/react";
import Footer from "./Footer";

describe("Basic tests", () => {
    test("Match snapshot", () => {
        
        render(<Footer/>);
        expect(screen.getByTestId("footer")).toMatchSnapshot();
    })
})