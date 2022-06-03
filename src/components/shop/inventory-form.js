import React, { Component } from "react";
import axios from "axios";
import { DropzoneComponent } from "react-dropzone-component";

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class InventoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: "",
      description: "",
      image: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleImageDrop = this.handleImageDrop.bind(this);
    this.imageRef = React.createRef();
  }

  handleImageDrop() {
    return {
      addedfile: (file) => this.setState({ image: file }),
    };
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".jpeg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post",
      uploadMultiple: false,
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 10,
      uploadMultiple: false,
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  createProduct(event) {
    event.preventDefault();
    axios
      .post("https://marina-backend.herokuapp.com/store", {
        name: this.state.name,
        description: this.state.description,
        image: this.state.image.dataURL,
        price: parseFloat(this.state.price),
      })

      .then((response) => {
        this.props.SuccessfulStoreSubmission(response.data);

        this.setState({
          name: "",
          description: "",
          image: "",
          price: "",
        });

        [this.imageRef].forEach((ref) => {
          ref.current.dropzone.removeAllFiles();
        });
      })

      .catch((error) => {
        console.log("store form handleSubmit error", error);
      });
  }

  render() {
    return (
      <form onSubmit={this.createProduct} className="add-product inventory-form-wrapper">
        <h2>Inventory Manager</h2>
        <input
          name="name"
          value={this.state.name}
          type="text"
          placeholder="Nombre"
          onChange={this.handleChange}
        />
        <input
          name="price"
          value={this.state.price}
          type="text"
          placeholder="Precio"
          onChange={this.handleChange}
        />
        <textarea
          name="description"
          value={this.state.description}
          placeholder="Descripción"
          onChange={this.handleChange}
        />
        <div className="image-uploaders">
          <DropzoneComponent
            ref={this.imageRef}
            config={this.componentConfig()}
            djsConfig={this.djsConfig()}
            eventHandlers={this.handleImageDrop()}
          >
            <div className="dz-message">
              Arrastra aquí la imagen del producto
            </div>
          </DropzoneComponent>
        </div>

        <button className="btn add-product-btn" type="submit">
          Añadir producto
        </button>
      </form>
    );
  }
}
