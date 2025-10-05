import { useCart } from '../context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Your Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 gap-6">
              {cartItems.map(item => (
                <div key={item.cartItemId} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                    <div>
                        <h2 className="text-xl font-semibold">{item.name}</h2>
                        {item.rentalStartDate ? (
                            <>
                                <p className="text-gray-500">Rental: {new Date(item.rentalStartDate).toLocaleDateString()} to {new Date(item.rentalEndDate!).toLocaleDateString()}</p>
                                <p className="text-gray-500">{item.rentalDays} days</p>
                            </>
                        ) : (
                            <p className="text-gray-500">₹{item.price.toLocaleString()} each</p>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    {item.rentalStartDate ? (
                        <div className="flex items-center" style={{ width: '118px' }}>
                            {/* Rental items have a fixed quantity of 1 */}
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <button onClick={() => decreaseQuantity(item.cartItemId)} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300">-</button>
                            <span className="px-4 py-1 bg-gray-100 text-gray-800 font-semibold">{item.quantity}</span>
                            <button onClick={() => increaseQuantity(item.cartItemId)} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300">+</button>
                        </div>
                    )}
                    <div className="text-right w-24">
                        <p className="text-lg font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.cartItemId)}>
                        Remove
                    </Button>
                </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-right">
              <h2 className="text-2xl font-bold">Total: ₹{totalPrice.toLocaleString()}</h2>

              <div className="mt-4">
                <Button variant="destructive" onClick={clearCart} className="mr-4">
                  Clear Cart
                </Button>
                <Button onClick={handleCheckout} className="bg-blue-600 text-white hover:bg-blue-700" >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
