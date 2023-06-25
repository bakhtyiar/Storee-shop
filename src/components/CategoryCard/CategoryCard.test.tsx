import CategoryCard from "./CategoryCard";
import {screen} from "@testing-library/react";
import {renderWithRouter} from "../../../tests/integration-helpers/renderWithRouter";
import {routes} from "../../utils/constants";

describe('CategoryCard test', () => {
    test('Match snapshot', () => {
        renderWithRouter(<CategoryCard header={''}/>, routes.notFound.path);
        expect(screen.getByTestId("category-card")).toMatchSnapshot();
    })
})
