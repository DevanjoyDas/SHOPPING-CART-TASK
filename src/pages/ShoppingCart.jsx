import { useState } from 'react';
import '../styles/ShoppingCart.css';

const ShoppingCart = () => {
  const initialProducts = [
    {
      id: 1,
      name: 'Product 1',
      price: 57.55,
      quantity: 1,
      image: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
      color: '🔴',
      size: 'EU 37',
      shipping: 'China',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 1049.0,
      quantity: 1,
      image: 'https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png',
      color: '⚫',
      storage: '32GB',
      shipping: 'China',
      warranty: 'Standard - 1 year'
    },
    {
      id: 3,
      name: 'Product 3',
      price: 20.55,
      quantity: 1,
      image: 'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png',
      shipping: 'Germany',
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (id, delta) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(0, product.quantity + delta) }
          : product
      )
    );
  };

  const calculateTotal = () => {
    return products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  };

  const handlePromoCode = () => {
    const totalAmount = calculateTotal();
    let discountAmount = 0;

    if (promoCode === 'DISCOUNT20') {
      const percentageDiscount = totalAmount * 0.2;
      discountAmount = Math.min(percentageDiscount, 500);
    } else if (promoCode === 'FLAT500') {
      discountAmount = 500;
    } else {
      discountAmount = 0; 
    }

    setDiscount(discountAmount);
  };

  const total = calculateTotal();
  const finalTotal = total - discount;

  return (
    <div className="cart-container">
      <h2 className="heading">Shopping Cart</h2>

      <div className="grid-header">
        <span>Product Name & Details</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Total</span>
      </div>

      {products.map((product) => (
        <div key={product.id} className="grid-row">
          <div className="product-details">
            <img src={product.image} alt={product.name} className="product-image" />
            <div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-specs">
                {product.color ? <span><strong>Color:</strong> {product.color} </span> : null}
                {product.size ? <span><strong>Size:</strong> {product.size} </span> : null}
                {product.storage ? <span><strong>Storage:</strong> {product.storage} </span> : null}
                {product.warranty ? <div><strong>Warranty:</strong> {product.warranty} </div> : null}
                {product.shipping ? <div><strong>Ships from:</strong> {product.shipping} </div> : null}
              </p>
            </div>
          </div>

          <div className="price">{product.price.toFixed(2)} ₹</div>

          <div className="quantity">
            <button className="button" onClick={() => handleQuantityChange(product.id, -1)}>-</button>
            <input type="text" value={product.quantity} readOnly className="quantity-input" />
            <button className="button" onClick={() => handleQuantityChange(product.id, 1)}>+</button>
          </div>

          <div className="total">{(product.quantity === 0 ? 0 : product.price * product.quantity).toFixed(2)} ₹</div>
        </div>
      ))}

      <div className='cart-end'>
        <div className="promo-section">
          <input
            type="text"
            placeholder="Promocode"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="promo-input"
          />
          <button className="apply-button" onClick={handlePromoCode}>Apply</button>
        </div>

        <div className="summary">
          <div>
            <p>Discount</p>
            <strong>{discount.toFixed(2)} ₹</strong>
          </div>
          <div>
            <p>Total Price</p>
            <strong>{finalTotal.toFixed(2)} ₹</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
