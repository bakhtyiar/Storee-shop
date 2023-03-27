import CartProductCard from "./CartProductCard";
import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {renderWithRouter} from "../../tests/helpers/renderWithRouter";

describe("CartProductCard tests", () => {
    test("Match snapshot", () => {
        renderWithRouter(<CartProductCard product={{quantity: 1}} selfIndexInCart={0}/>);
        expect(screen.getByTestId("cart-product-card")).toMatchSnapshot();
    })
    test("Minus quantity", () => {
        renderWithRouter(<CartProductCard product={{quantity: 2}} selfIndexInCart={0}/>);
        let cartProductCard = screen.getByTestId("cart-product-card");
        expect(cartProductCard).toBeInTheDocument();
        let minusButton = screen.getByTestId("minus-btn");
        expect(minusButton).toBeInTheDocument();
        userEvent.click(minusButton);
        let quantityField = screen.getByTestId("quantity-field");
        expect(quantityField.value).toBe("1");
    })
    test("Change quantity", () => {
        renderWithRouter(<CartProductCard product={{quantity: 1}} selfIndexInCart={0}/>);
        let cartProductCard = screen.getByTestId("cart-product-card");
        expect(cartProductCard).toBeInTheDocument();
        let quantityField = screen.getByTestId("quantity-field");
        expect(quantityField).toBeInTheDocument();
    })
    test("Plus quantity", () => {
        renderWithRouter(<CartProductCard product={{quantity: 1}} selfIndexInCart={0}/>);
        let cartProductCard = screen.getByTestId("cart-product-card");
        expect(cartProductCard).toBeInTheDocument();
        let plusButton = screen.getByTestId("plus-btn");
        expect(plusButton).toBeInTheDocument();
        userEvent.click(plusButton);
        let quantityField = screen.getByTestId("quantity-field");
        expect(quantityField).toBeInTheDocument();
        expect(quantityField.value).toBe("2");
    })
    test("Remove", () => {
        renderWithRouter(<CartProductCard product={{quantity: 1}} selfIndexInCart={0}/>);
        let removeButton = screen.getByTestId("remove-btn");
        expect(removeButton).toBeInTheDocument();
    })
})