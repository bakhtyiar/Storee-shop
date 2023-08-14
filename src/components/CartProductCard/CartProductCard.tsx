import React, {useContext, useEffect, useState} from 'react';
import {RootContext} from "../../contexts/root-context/root-context";
import {Link} from "react-router-dom";
import {routes} from "../../utils/constants";
import imageIcon from "../../assets/img/icons/image/icons8-image-48.png";
import {Button, Form} from "react-bootstrap";

const CartProductCard = ({
    product,
    selfIndexInCart
}: any) => {
    const {cartState: {onRemoveFromCart, onUpdateQuantity}, themeState: {theme}} = useContext(RootContext);
    const [quantity, setQuantity] = useState(product.quantity);

    useEffect(() => {
        if (quantity < 1) {
            onRemoveFromCart(selfIndexInCart);
        } else {
            onUpdateQuantity(product.id, quantity);
        }
    }, [quantity]);

    return (
        <div className='px-2 py-3 border rounded d-flex flex-sm-row flex-column align-items-center text-decoration-none' style={{'color': 'inherit'}} data-testid='cart-product-card'>
            
            <Link className='w-100 d-flex flex-row text-decoration-none'
                  style={{'color': 'inherit'}}
                  to={`${routes.product.path}/${product.id}`}
                  data-testid='product-link'
            >
                
                <div className={'bg-image rounded align-self-center'}
                     style={{
                         height: '64px',
                         width: '64px',
                         backgroundImage: `url(${product.thumbnail || imageIcon})`,
                         backgroundPosition: 'center',
                         backgroundSize: 'contain',
                         backgroundRepeat: 'no-repeat'
                     }}/>
                
                <div className='flex-column ms-2'>
                    
                    <h6 className='mt-2'>{product.title}</h6>
                    
                    <p className='my-0'>Price: {product.price}</p>
                </div>
            </Link>
            
            <div className='ml-3 d-flex gap-3 flex-row flex-sm-column flex-lg-row align-self-end align-self-sm-center'>
                
                <div className='d-flex gap-1'>
                    
                    <Button
                        variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
                        onClick={() => {
                            setQuantity((prevState: any) => prevState - 1);
                        }}
                        data-testid="minus-btn"
                    >
                        -
                    </Button>
                    
                    <Form.Control
                        type="number"
                        style={{
                            'maxWidth': '100px',
                            'width': 'fit-content'
                        }}
                        value={quantity}
                        placeholder="Quantity"
                        onChange={(e) => {
                            setQuantity(Number(e.target.value));
                        }}
                        data-testid={"quantity-field"}
                    />
                    
                    <Button
                        variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
                        onClick={() => {
                            setQuantity((prevState: any) => prevState + 1);
                        }}
                        data-testid="plus-btn"
                    >
                        +
                    </Button>
                </div>
                
                <Button
                    variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
                    className='d-flex rounded justify-content-center'
                    onClick={(e) => {
                        e.preventDefault();
                        onRemoveFromCart(selfIndexInCart);
                    }}
                    data-testid="remove-btn"
                >
                    
                    <i className="bi bi-x"></i>
                    {' '}
                    Remove
                </Button>
            </div>
        </div>
    );
};

export default CartProductCard;