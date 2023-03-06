import React, {useContext} from 'react';
import imageIcon from '../../assets/img/icons/image/icons8-image-48.png';
import {routes} from '../../utils/constants';
import {Link} from 'react-router-dom';
import {Button} from "react-bootstrap";
import {RootContext} from "../../contexts/root-context/root-context";

const ProductCard = ({item}) => {
    const { cartState: { onAddToCart } } = useContext(RootContext);

    return (
        <Link className='px-2 py-3 border rounded d-flex flex-column align-items-start text-decoration-none text-black' to={`${routes.product.path}/${item.id}`} key={item.id}>
            <div className={'bg-image rounded align-self-center'}
                 style={{
                     height: '128px',
                     width: '100%',
                     backgroundImage: `url(${item.thumbnail || imageIcon})`,
                     backgroundPosition: 'center',
                     backgroundSize: 'contain',
                     backgroundRepeat: 'no-repeat'
                 }}/>
            <h6 className='mt-2'>{item.title}</h6>
            <p>Price: ${item.price}</p>
            <Button
                variant='dark'
                className='w-100'
                onClick={ (e) => {
                    e.preventDefault();
                    onAddToCart(item.id);
                }}
            >
                <i className="bi bi-bag-plus"></i>
                {' '}
                Add to cart
            </Button>
        </Link>
    );
}

export default ProductCard;