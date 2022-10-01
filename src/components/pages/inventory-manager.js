import React, { Component } from "react";
import axios from "axios";

import InventorySidebarList from "../shop/inventory-sidebar-list";
import InventoryForm from "../shop/inventory-form";

export default class InventoryManager extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
    };

    this.SuccessfulStoreSubmission = this.SuccessfulStoreSubmission.bind(this);
    this.handleStoreFormSubmissionError =
      this.handleStoreFormSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick(product) {
    axios
      .delete(
        `https://marina-back-end-wjnsy.ondigitalocean.app/store/${product._id.$oid}`
      )
      .then((response) => {
        this.setState({
          products: this.state.products.filter((item) => {
            return item._id.$oid !== product._id.$oid;
          }),
        });

        return response.data;
      })
      .catch((error) => {
        console.log("handleDeleteClick error", error);
      });
  }

  SuccessfulStoreSubmission(product) {
    this.setState({
      products: [product].concat(this.state.products),
    });
  }

  handleStoreFormSubmissionError(error) {
    console.log("handleStoreFormSubmissionError error", error);
  }

  getStoreItems() {
    axios
      .get("https://marina-back-end-wjnsy.ondigitalocean.app/store")
      .then((response) => {
        this.setState({
          products: response.data,
        });
      })
      .catch((error) => {
        console.log("error in getStoreItems", error);
      });
  }

  componentDidMount() {
    this.getStoreItems();
  }

  render() {
    return (
      <div className="manager-wrapper">
        <div className="left-column">
          <div>
            <InventoryForm
              SuccessfulStoreSubmission={this.SuccessfulStoreSubmission}
              handleStoreFormSubmissionError={
                this.handleStoreFormSubmissionError
              }
            />
          </div>
        </div>

        <div className="right-column">
          <InventorySidebarList
            handleDeleteClick={this.handleDeleteClick}
            data={this.state.products}
          />
        </div>
      </div>
    );
  }
}
