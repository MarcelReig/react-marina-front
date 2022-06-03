import React, { Component } from "react";
import Header from "../shop/header";
import Order from "../shop/order";
import Product from "../shop/product";

import axios from "axios";

export default class Shop extends Component {
  state = {
    products: [],
    order: {},
  };

  getProducts = () => {
    axios
      .get("https://marina-backend.herokuapp.com/store")
      .then((response) => {
        this.setState({
          products: response.data,
        });
        console.log("Response", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getProducts();
  }

  addToOrder = (key) => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };

  render() {
    return (
      <div className="marina-store">
        <div className="menu">
          <Header tagline="Mercadillo de Arte" />
          <ul className="products">
            {Object.keys(this.state.products).map((key) => (
              <Product
                key={key}
                index={key}
                details={this.state.products[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order products={this.state.products} order={this.state.order} />
      </div>
    );
  }
}
