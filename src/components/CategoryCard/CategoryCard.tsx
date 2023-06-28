import React from 'react';
import {routes} from "../../utils/constants";
import {useNavigate} from "react-router-dom";
import {Card} from "react-bootstrap";
import {capitalizeStr, replaceDashToSpace} from "../../utils/str/str";
import styled from "styled-components";

const StyledCard = styled(Card)`
  cursor: pointer;
  transition: all ease-in-out 0.2s;
  :hover {
    background-color: var(--gray-200);
    border-color: var(--gray-400);
  }
`;

const CategoryCard = (props: any) => {
    let navigate = useNavigate();
    let headerFormatted = props.header;
    headerFormatted = capitalizeStr(headerFormatted);
    headerFormatted = replaceDashToSpace(headerFormatted);

    return (
            <StyledCard
                onClick={() => navigate(`${routes.products.path}/1?category=${props.header}`)}
                className="mb-2"
                data-testid="category-card"
            >
                
                <Card.Body className={'d-flex flex-column justify-center'}>
                    
                    <Card.Title className='m-0'>{headerFormatted}</Card.Title>
                    
                    {props.picture && <img alt={'No material'} src={props.picture} className={'img-fluid align-self-center'}
                                           style={{maxHeight: '256px'}}/>}
                </Card.Body>
            </StyledCard>
    );
};

export default CategoryCard;
