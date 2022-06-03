import React, { Component } from "react";
import { formatPrice } from "../../helpers/format-price";

export default class Product extends Component {
  handleClick = () => {
    this.props.addToOrder(this.props.index);
  };
  render() {
    const { image, name, price, desc } = this.props.details;
   
    return (
      <li className="menu-product">
        <img src={image} alt={name} />
        <h3 className="product-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button className="btn" onClick={this.handleClick}>
          Añadir Al Carrito
        </button>
      </li>
    );
  }
}
