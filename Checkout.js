import React, { useState } from 'react';

function Checkout() {
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = () => {
    // TODO: Call place order API
    console.log('Order placed with address:', address, 'and payment method:', paymentMethod);
  };

  return (
    <div>
      <h1>Checkout</h1>
      <form>
        <div>
          <label>Delivery Address:</label>
          <textarea
            value={address}
            onChange={handleAddressChange}
            required
          />
        </div>
        <div>
          <label>Payment Method:</label>
          <select value={paymentMethod} onChange={handlePaymentMethodChange}>
            <option value="COD">Cash on Delivery</option>
            <option value="Card">Credit/Debit Card</option>
          </select>
        </div>
        <h2>Order Summary</h2>
        {/* TODO: Display order summary */}
        <button onClick={handlePlaceOrder}>Place Order</button>
      </form>
    </div>
  );
}

export default Checkout; 