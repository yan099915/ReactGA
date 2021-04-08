import "./BoyScreen.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactGA from "react-ga";
import { withRouter } from "react-router-dom";

// Components
import Product from "../components/Product";

//Actions
import { getProducts as listProducts } from "../redux/actions/productActions";

const BoyScreen = () => {
  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;

  const { REACT_APP_GA_TRACKING_CODE } = process.env;
  ReactGA.initialize(REACT_APP_GA_TRACKING_CODE);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="boyscreen">
      <h2 className="boyscreen__title">Boy Products</h2>
      <div className="boyscreen__products">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          products.map((product) => (
            <Product
              key={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
              productId={product._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default withRouter(BoyScreen);
