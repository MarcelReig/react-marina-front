import React, { Component } from "react";
import axios from "axios";

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collection_name: "",
      description: "",
      thumb_img_url: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    axios
      .post("http://127.0.0.1:5000/add", {
        name: this.state.collection_name,
        description: this.state.description,
        thumb_img_url: this.state.thumb_img_url,
      })

      .then((response) => {
        this.props.handleSuccessfulFormSubmission(response.data);
        console.log("response", response);
      })
      .catch((error) => {
        console.log("portfolio form handleSubmit error", error);
      });

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>PortfolioForm</h1>

        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              name="collection_name"
              placeholder="Nombre de colección"
              value={this.state.collection_name}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="thumb_img_url"
              placeholder="Imagen url"
              value={this.state.thumb_img_url}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <button type="submit">Añadir colección</button>
          </div>
        </form>
      </div>
    );
  }
}
