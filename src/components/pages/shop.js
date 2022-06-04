import React, { Component } from "react";
import Order from "../shop/order";
import Product from "../shop/product";
import Header from "../shop/header";

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

  removeFromOrder = (key) => {
    const order = { ...this.state.order };
    delete order[key];
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
        <Order
          products={this.state.products}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
      </div>
    );
  }
}
