import React, {useContext, useEffect, useState} from "react";
import {RootContext} from "../../contexts/root-context/root-context";
import {Link} from "react-router-dom";
import {routes} from "../../utils/constants";
import imageIcon from "../../assets/img/icons/image/icons8-image-48.png";

const OrderProductCard = ({product, selfIndexInCart}) => {
    const {cartState: {onRemoveFromCart, onUpdateQuantity}} = useContext(RootContext);
    const [quantity, setQuantity] = useState(product.quantity);

    useEffect(() => {
        if (quantity < 1) {
            onRemoveFromCart(selfIndexInCart);
        } else {
            onUpdateQuantity(product.id, quantity);
        }
    }, [quantity]);

    return (
        <Link to={`${routes.product.path}/${product.id}`}
              className='px-2 py-3 d-flex flex-row align-items-center text-decoration-none text-black'>
            <div className='w-100 d-flex flex-row'>
                <div className={'bg-image rounded align-self-center'}
                     style={{
                         height: '128px',
                         width: '128px',
                         backgroundImage: `url(${product.thumbnail || imageIcon})`,
                         backgroundPosition: 'center',
                         backgroundSize: 'contain',
                         backgroundRepeat: 'no-repeat'
                     }}/>
                <div className='flex-column align-self-center ms-2'>
                    <h6 className='my-0'>{product.title}</h6>
                    {product.quantity && <p className='my-0'>Quantity: {product.quantity}</p>}
                    {product.category && <p className='my-0'>Brand: {product.category}</p>}
                    {product.brand && <p className='my-0'>Brand: {product.brand}</p>}
                    {product.rating && <p className='my-0'>Rating: {product.rating}</p>}
                </div>
            </div>
            <div className='ml-3 d-flex gap-2'>
                <h6>Price: ${product.price}</h6>
            </div>
        </Link>
    );
};

export default OrderProductCard;