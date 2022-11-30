import React from 'react';
import {routes} from "../utils/constants";
import {Link} from "react-router-dom";
import {Card} from "react-bootstrap";
import {capitalizeStr, replaceDashToSpace} from "../utils/methods";

const CategoryCard = (props) => {
    let header = props.header;
    header = capitalizeStr(header);
    header = replaceDashToSpace(header);

    return (
        <Link to={routes.products.path} style={{'color': 'black', 'textDecoration': 'none'}}>
            <Card
                bg={'Light'.toLowerCase()}
                style={{width: '18rem'}}
                className="mb-2"
            >
                <Card.Body>
                    <Card.Title style={{'margin': '0'}}>{header}</Card.Title>
                </Card.Body>
            </Card>
        </Link>
    );
};

export default CategoryCard;
