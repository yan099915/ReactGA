import "./CheckoutScreen.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import ReactGA from "react-ga";
import { withRouter } from "react-router-dom";

// Components
import CartItem from "../components/CartItem";

// Actions
import { addToCart, removeFromCart } from "../redux/actions/cartActions";

const CheckoutScreen = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const { REACT_APP_GA_TRACKING_CODE } = process.env;
  ReactGA.initialize(REACT_APP_GA_TRACKING_CODE);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

  return (
    <>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Checkout Items</h2>

          {cartItems.length === 0 ? (
            <div>
              Your Cart Is Empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.product}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeFromCartHandler}
              />
            ))
          )}
          <div className="cartscreen__right">
            <div>
              <span>Enter Your Shipping Address</span>
              <hr></hr>
              <form>
                <label for="fname">First name:</label>
                <br></br>
                <input
                  className="name_form"
                  type="text"
                  id="fname"
                  name="fname"
                ></input>
                <br></br>
                <label for="telp">Telp:</label>
                <br></br>
                <input
                  className="telp_form"
                  type="text"
                  id="telp"
                  name="telp"
                ></input>
                <br></br>
                <label for="address">Full Address:</label>
                <br></br>
                <textarea
                  className="address_form"
                  type="text"
                  id="address"
                  name="address"
                ></textarea>
              </form>
            </div>
            <div className="cartscreen__info">
              <p>Subtotal ({getCartCount()}) items</p>
              <NumberFormat
                value={getCartSubTotal()}
                className="foo"
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp "}
                renderText={(value, props) => <div {...props}>{value}</div>}
              />
            </div>
            <div>
              <button href="/">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(CheckoutScreen);
