import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState([]);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base
      requireHeader="true"
      title="Home Page"
      description="Here is the description of Home"
    >
      <h1 className="text-black">All of T shirts</h1>

      <div className="mycontainer">
        <div className="mycards text-center">
          {products.map((product, index) => {
            return (
              <div key={index}>
                <Card product={product} classForCard="mycard" />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default Home;
