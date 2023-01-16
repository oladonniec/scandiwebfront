import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [currentProduct, setCurrentProduct] = useState("typeswitcher");

  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [dimensions, setDimensions] = useState();
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");

  const handletypeChange = (event) => {
    setCurrentProduct(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("sku", sku);
    formData.append("name", name);
    formData.append("price", price);
    if (currentProduct === "discs") {
      formData.append("size", size);
    } else if (currentProduct === "books") {
      formData.append("weight", weight);
    } else if (currentProduct === "furnitures") {
      setDimensions(height + "x" + width + "x" + length);
      console.log(dimensions);
      formData.append("dimension", dimensions);
    }
    const url = "http://localhost:8080/scandiback/api/posts/insert.php";
    axios
      .post(url, formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    navigate("/");
  };

  return (
    <div className="productAddContainer">
      <div className="row">
        <h2>Product Add</h2>
        <div>
          <button type="submit" id="save-button" onClick={handleSubmit}>
            Save
          </button>
          <button id="cancel-button">Cancel</button>
        </div>
      </div>
      <hr></hr>
      <form action="" id="product_form">
        <div>
          <label htmlFor="sku">SKU</label>
          <input
            name="sku"
            type="text"
            id="sku"
            placeholder="SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            name="price"
            type="text"
            id="price"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="type-switcher">Type Switcher</label>
          <select
            onChange={handletypeChange}
            defaultValue={currentProduct}
            id="productType"
          >
            <option value="typeswitcher">Type Switcher</option>
            <option value="discs" id="DVD">
              DVD
            </option>
            <option value="furnitures" id="Furniture">
              Furnitures
            </option>
            <option value="books" id="Book">
              Books
            </option>
          </select>
        </div>
        <div>
          {currentProduct === "books" ? (
            <div className="productSwitch">
              <h3>Books</h3>
              <React.Fragment>
                <label htmlFor="weight">Weight (KG)</label>
                <input
                  name="weight"
                  type="text"
                  id="weight"
                  placeholder="Weight"
                  onChange={(e) => setWeight(e.target.value)}
                />
              </React.Fragment>
              <p>
                <small>This is the books description</small>
              </p>
            </div>
          ) : currentProduct === "discs" ? (
            <div className="productSwitch">
              <h3>DVD</h3>
              <React.Fragment>
                <label>Size</label>
                <input
                  name="size"
                  type="text"
                  id="size"
                  placeholder="Size"
                  onChange={(e) => setSize(e.target.value)}
                />
              </React.Fragment>
              <p>
                <small>This is the dvd description</small>
              </p>
            </div>
          ) : currentProduct === "furnitures" ? (
            <div className="productSwitch">
              <h3>Furniture</h3>
              <div>
                <label htmlFor="height">Height</label>
                <input
                  name="height"
                  type="text"
                  id="height"
                  placeholder="Height"
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="width">Width</label>
                <input
                  name="size"
                  type="text"
                  id="width"
                  placeholder="Width"
                  onChange={(e) => setWidth(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="length">Length</label>
                <input
                  name="size"
                  type="text"
                  id="length"
                  placeholder="Length"
                  onChange={(e) => setLength(e.target.value)}
                />
              </div>
              <p>
                <small>This is the furniture description</small>
              </p>
            </div>
          ) : (
            <div className="productSwitch">
              <p>
                <strong>Please Select Your Product Type</strong>
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
