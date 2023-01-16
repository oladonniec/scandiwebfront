import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();

  const [discs, setDiscs] = useState([]);
  const [furnitures, setFurnitures] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    const url = "http://localhost:8080/scandiback/api/posts/read.php";
    axios.get(url).then((res) => {
      setDiscs(res.data.discs);
      setFurnitures(res.data.furnitures);
      setBooks(res.data.books);
    });
  };

  return (
    <div className="productListContainer">
      <div className="row">
        <h2>Product List</h2>
        <div>
          <button
            id="add-button"
            onClick={() => {
              navigate("/addproduct");
            }}
          >
            ADD
          </button>
          <button id="delete-product-button">Mass Delete</button>
        </div>
      </div>
      <hr></hr>
      <div className="product-list row center">
        <div className="discs">
          {discs ? (
            discs.map((disc) => (
              <div className="card" key={disc.sku}>
                <div>
                  <input type="checkbox" className="delete-checkbox" />
                </div>
                <ul>
                  <li>SKU: {disc.sku}</li>
                  <li>Name: {disc.name}</li>
                  <li>Price: {disc.price}</li>
                  <li>Size: {disc.size}</li>
                </ul>
              </div>
            ))
          ) : (
            <React.Fragment>
              <h3>Server Not Found</h3>
            </React.Fragment>
          )}
        </div>
        <div className="books">
          {books ? (
            books.map((book) => (
              <div className="card" key={book.sku}>
                <div>
                  <input type="checkbox" className="delete-checkbox" />
                </div>
                <ul>
                  <li>SKU: {book.sku}</li>
                  <li>Name: {book.name}</li>
                  <li>Price: {book.price}</li>
                  <li>Weight: {book.weight}</li>
                </ul>
              </div>
            ))
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </div>
        <div className="furnitures">
          {furnitures ? (
            furnitures.map((furniture) => (
              <div className="card" key={furniture.sku}>
                <div>
                  <input type="checkbox" className="delete-checkbox" />
                </div>
                <ul>
                  <li>SKU: {furniture.sku}</li>
                  <li>Name: {furniture.name}</li>
                  <li>Price: {furniture.price}</li>
                  <li>Dimensions: {furniture.dimensions}</li>
                </ul>
              </div>
            ))
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
