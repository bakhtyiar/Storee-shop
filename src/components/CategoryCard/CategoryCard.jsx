import React from 'react';
import {routes} from "../../utils/constants";
import {useNavigate} from "react-router-dom";
import {Card} from "react-bootstrap";
import {capitalizeStr, replaceDashToSpace} from "../../utils/str/str";

const CategoryCard = (props) => {
    let header = props.header;
    let navigate = useNavigate();
    header = capitalizeStr(header);
    header = replaceDashToSpace(header);

    return (
        <div
            onClick={() => navigate(`${routes.products.path}/1?category=${props.header}`)}
        >
            <Card
                bg={'light'}
                className="mb-2"
            >
                <Card.Body>
                    <Card.Title className='m-0'>{header}</Card.Title>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CategoryCard;
