import React, { Component } from "react";
import axios from "axios";
// import { DropzoneComponent } from "react-dropzone-component";

// import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
// import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

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


    // Dropzone
    // this.componentConfig = this.componentConfig.bind(this);
    // this.djsConfig = this.djsConfig.bind(this);
    // this.handleImageDrop = this.handleImageDrop.bind(this);

    // this.ImageRef = React.createRef();
  }

  // handleImageDrop() {
  //   return {
  //     addedfile: (file) => this.setState({ image: file }),
  //   };
  // }

  // componentConfig() {
  //   return {
  //     iconFiletypes: [".jpg", ".jpeg", ".png"],
  //     showFiletypeIcon: true,
  //     postUrl: "https://httpbin.org/post",
  //     uploadMultiple: false,
  //   };
  // }

  // djsConfig() {
  //   return {
  //     addRemoveLinks: true,
  //     maxFiles: 10,
  //     uploadMultiple: false,
  //   };
  // }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  createProduct = (event) => {
    axios
      .post("https://marina-backend.herokuapp.com/store", {
        name: this.state.name,
        description: this.state.description,
        image: this.state.image,
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

        // [this.imageRef].forEach((ref) => {
        //   ref.current.dropzone.removeAllFiles();
        // });
      })

      .catch((error) => {
        console.log("store form handleSubmit error", error);
      });

    event.preventDefault();
  };

  render() {
    return (
      <div className="inventory">
        <h2>Inventario</h2>
        <form className="add-product" onSubmit={this.createProduct}>
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
          <input
            name="image"
            value={this.state.image}
            type="text"
            placeholder="Imagen"
            onChange={this.handleChange}
          />
          <button className="btn" type="submit">
            Añadir producto
          </button>
        </form>
      </div>
    );
  }
}
