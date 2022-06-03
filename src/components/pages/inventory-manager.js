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

  handleDeleteClick(storeItem) {
    axios
      .delete(
        `https://marina-backend.herokuapp.com/store/${storeItem._id.$oid}`
      )
      .then((response) => {
        this.setState({
          storeItems: this.state.storeItems.filter((item) => {
            return item._id.$oid !== storeItem._id.$oid;
          }),
        });

        return response.data;
      })
      .catch((error) => {
        console.log("handleDeleteClick error", error);
      });
  }

  SuccessfulStoreSubmission(storeItem) {
    this.setState({
      storeItems: [storeItem].concat(this.state.storeItems),
    });
  }

  handleStoreFormSubmissionError(error) {
    console.log("handleStoreFormSubmissionError error", error);
  }

  getStoreItems() {
    axios
      .get("https://marina-backend.herokuapp.com/store")

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
      <div className="portfolio-manager-wrapper">
        <div className="left-column">
          <InventoryForm
            SuccessfulStoreSubmission={this.SuccessfulStoreSubmission}
            handleStoreFormSubmissionError={this.handleStoreFormSubmissionError}
          />
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
