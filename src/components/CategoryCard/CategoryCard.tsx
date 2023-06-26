import React from 'react';
import {routes} from "../../utils/constants";
import {useNavigate} from "react-router-dom";
import {Card} from "react-bootstrap";
import {capitalizeStr, replaceDashToSpace} from "../../utils/str/str";

const CategoryCard = (props: any) => {
    let navigate = useNavigate();
    let headerFormatted = props.header;
    headerFormatted = capitalizeStr(headerFormatted);
    headerFormatted = replaceDashToSpace(headerFormatted);

    return (
            <Card
                onClick={() => navigate(`${routes.products.path}/1?category=${props.header}`)}
                bg={'light'}
                className="mb-2"
                data-testid="category-card"
            >
                
                <Card.Body className={'d-flex flex-column justify-center'}>
                    
                    <Card.Title className='m-0'>{headerFormatted}</Card.Title>
                    
                    {props.picture && <img alt={'No material'} src={props.picture} className={'img-fluid align-self-center'}
                                           style={{maxHeight: '256px'}}/>}
                </Card.Body>
            </Card>
    );
};

export default CategoryCard;
