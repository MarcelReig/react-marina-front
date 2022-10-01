import React, { Component } from "react";
import Order from "../shop/order";
import Product from "../shop/product";
import Header from "../shop/header";

import axios from "axios";
import SkeletonShop from "../skeletons/SkeletonShop";

export default class Shop extends Component {
  state = {
    isLoading: true,
    products: [],
    order: {},
  };

  getProducts = () => {
    axios
      .get("https://marina-back-end-wjnsy.ondigitalocean.app/store")
      .then((response) => {
        this.setState({
          products: response.data,
          isLoading: false,
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
    if (this.state.isLoading) {
      return (
        <div className="marina-store">
          <div className="menu">
            <Header tagline="Mercadillo de Arte" />
            <SkeletonShop />
            <SkeletonShop />
            <SkeletonShop />
            <SkeletonShop />
            <SkeletonShop />
            <SkeletonShop />
          </div>
          <Order
            products={this.state.products}
            order={this.state.order}
            removeFromOrder={this.removeFromOrder}
          />
        </div>
      );
    }

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
