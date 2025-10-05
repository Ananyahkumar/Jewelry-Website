import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';



import Home from './Pages/Home';
import HeadJewelryCollection from './Pages/HeadJewelryCollection.tsx';
import Intro from './Pages/Intro';
import CustomDesign from './Pages/CustomDesign';
import Nearby from './Pages/Nearby';
import Location from './Pages/Location';
import Login from './Pages/Login';
import Second from './Pages/Second';
import Collections from './Pages/Collections';
import Category from './Pages/Category';
import Parts from './Pages/Parts';
import Payment from './Pages/Payment';
import About from './Pages/About';
import YourOrders from './Pages/YourOrders';
import BuyNow from './Pages/BuyNow';
import BuySet from './Pages/BuySet';
import Success from './Pages/success';
import Register from './Pages/Register';
import RequireAuth from './Pages/RequireAuth';
import PartyWearCollection from './Pages/PartyWearCollection';
import ShopDetails from "./Pages/ShopDetails";
import RamiJewelryCollection from "./Pages/RamiJewelryCollection";
import CrockersJewelryCollection from "./Pages/CrockersJewelryCollection";
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Make login the default page */}
          <Route path="/" element={<Login />} />
          
          {/* Protected routes */}
          <Route path="/home" element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          } />
          
          <Route path="/intro" element={
            <RequireAuth>
              <Intro />
            </RequireAuth>
          } />
          
          <Route path="/Register" element={<Register />} />
          <Route path="/customDesign" element={
            <RequireAuth>
              <CustomDesign />
            </RequireAuth>
          } />
          
          <Route path="/nearby" element={
            <RequireAuth>
              <Nearby />
            </RequireAuth>
          } />
          
          <Route path="/location" element={
            <RequireAuth>
              <Location />
            </RequireAuth>
          } />
          
          <Route path="/second" element={
            <RequireAuth>
              <Second />
            </RequireAuth>
          } />
          
          <Route path="/collection" element={
            <RequireAuth>
              <Collections />
            </RequireAuth>
          } />
          
          <Route path="/category" element={
            <RequireAuth>
              <Category />
            </RequireAuth>
          } />
          
          <Route path="/parts" element={
            <RequireAuth>
              <Parts />
            </RequireAuth>
          } />
          
          <Route path="/payment" element={
            <RequireAuth>
              <Payment />
            </RequireAuth>
          } />
          
          <Route path="/Contact" element={
            <RequireAuth>
              <About />
            </RequireAuth>
          } />
          
          <Route path="/yourorders" element={
            <RequireAuth>
              <YourOrders />
            </RequireAuth>
          } />
          
          <Route path="/buy/:id" element={
            <RequireAuth>
              <BuyNow />
            </RequireAuth>
          } />
          
          <Route path="/buyset/:id" element={
            <RequireAuth>
              <BuySet />
            </RequireAuth>
          } />
          
          <Route path="/success" element={
            <RequireAuth>
              <Success />
            </RequireAuth>
          } />
          
          <Route path="/collections/head-jewelry" element={
            <RequireAuth>
              <HeadJewelryCollection />
            </RequireAuth>
          } />
          
          <Route path="/party-wear-collection" element={
            <RequireAuth>
              <PartyWearCollection />
            </RequireAuth>
          } />
          
          <Route path="/shop-details" element={
            <RequireAuth>
              <ShopDetails />
            </RequireAuth>
          } />
          
          <Route path="/rami-jewelry-collection" element={
            <RequireAuth>
              <RamiJewelryCollection />
            </RequireAuth>
          } />
          
          <Route path="/crockers-jewelry-collection" element={
            <RequireAuth>
              <CrockersJewelryCollection />
            </RequireAuth>
          } />
          
          <Route path="/checkout" element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          } />
          
          <Route path="/cart" element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          } />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;