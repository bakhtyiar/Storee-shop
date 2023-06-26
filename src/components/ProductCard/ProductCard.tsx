import React, {useContext} from 'react';
import imageIcon from '../../assets/img/icons/image/icons8-image-48.png';
import {routes} from '../../utils/constants';
import {Link} from 'react-router-dom';
import {Badge, Button} from "react-bootstrap";
import {RootContext} from "../../contexts/root-context/root-context";

const ProductCard = ({
    item
}: any) => {
    const {cartState: {onAddToCart}} = useContext(RootContext);

    return (
        <Link className='px-2 py-3 border rounded d-flex flex-column align-items-start text-decoration-none text-black'
              to={`${routes.product.path}/${item.id}`} key={item.id} data-testid={"product-card"}>
            
            <div className={'bg-image rounded align-self-center'}
                 style={{
                     height: '128px',
                     width: '100%',
                     backgroundImage: `url(${item.thumbnail || imageIcon})`,
                     backgroundPosition: 'center',
                     backgroundSize: 'contain',
                     backgroundRepeat: 'no-repeat'
                 }}/>
            
            <p className={'mb-0'}><i className="bi bi-star-fill text-warning"></i> <small>{item.rating}</small></p>
            
            <p className='mb-0'><b>{item.title}</b></p>
            
            <div>
                
                <small><del>${item.price}</del></small>
                
                <br/>
                
                <p className={'d-flex'}><big><b>${Math.round(item.price * (100 - item.discountPercentage) / 100)}</b></big> <Badge className={'align-self-start ms-1'} bg="warning" text="dark">{item.discountPercentage}%</Badge></p>
            </div>
            
            <Button
                variant='dark'
                className='w-100'
                onClick={(e) => {
                    e.preventDefault();
                    onAddToCart(item.id);
                }}
                data-testid="add-to-card-button"
            >
                
                <i className="bi bi-bag-plus"></i>
                {' '}
                Add to cart
            </Button>
        </Link>
    );
}

export default ProductCard;