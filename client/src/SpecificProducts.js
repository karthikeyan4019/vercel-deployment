import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./ProductsShow.css";

const SpecificProducts = () => {
  const { x } = useParams();

  const [min_price, setMin_price] = useState("");
  const [max_price, setMax_price] = useState("");
  const [products, setProducts] = useState([]);

  const productsDataFun = useCallback(async () => {
    try {
      const response = await fetch(
        `https://kuvizz-app-server.onrender.com/api/v1/filter?category=${x}&min_price=${encodeURIComponent(
          min_price
        )}&max_price=${encodeURIComponent(max_price)}`
      );

      const data = await response.json();

      if (data?.PRODUCTS) {
        setProducts(data.PRODUCTS);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [x, min_price, max_price]);

  useEffect(() => {
    productsDataFun();
  }, [productsDataFun]);

  return (
    <>
      {/* Filter options */}
      <div className="filter-options-container">
        <form>
          <label htmlFor="min-price">MIN PRICE :</label>
          <input
            className="price-input"
            id="min-price"
            type="text"
            value={min_price}
            onChange={(e) => setMin_price(e.target.value)}
          />

          <label htmlFor="max-price">MAX PRICE :</label>
          <input
            className="price-input"
            id="max-price"
            type="text"
            value={max_price}
            onChange={(e) => setMax_price(e.target.value)}
          />
        </form>
      </div>

      {/* Product cards */}
      <div id="card-parent">
        {products.length > 0 ? (
          products.map((value) => (
            <div id="card" key={value._id}>
              <img
                className="card-img"
                src={value.imagePath}
                alt={value.productName}
              />

              <h4>
                <b>{value.productName}</b>
              </h4>

              <div className="product-details-section">
                <p>
                  <b>{value.productDetails}</b>
                </p>
              </div>

              <div className="last-month-sale-section">
                <p className="last-month-sale">
                  <b>{value.lastMonthSale}+ bought in last month</b>
                </p>
              </div>

              <h2>
                <span style={{ color: "red" }}>
                  -{value.discount}%
                </span>{" "}
                {value.price}
              </h2>

              <a
                className="store-link"
                href={value.brandWebsiteUrl}
                target="_blank"
                rel="noreferrer"
              >
                Visit {value.storeName} Store
              </a>

              <button className="cart-btn">ADD TO CART</button>
            </div>
          ))
        ) : (
          <div className="empty-product-message-container">
            <h3 id="empty-products-message">
              😣 THERE IS NO PRODUCTS RELATED TO YOUR SEARCH
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default SpecificProducts;
