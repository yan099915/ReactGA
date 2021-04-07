import "./Product.css";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";

const Product = ({ imageUrl, description, price, name, productId }) => {
  return (
    <div className="product">
      <img src={imageUrl} alt={name} />

      <div className="product__info">
        <p className="info__name">{name}</p>

        <p className="info__description">{description.substring(0, 100)}...</p>

        <NumberFormat
          value={price}
          className="info__price"
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Rp "}
          renderText={(value, props) => <div {...props}>{value}</div>}
        />

        <Link to={`/product/${productId}`} className="info__button">
          View
        </Link>
      </div>
    </div>
  );
};

export default Product;
