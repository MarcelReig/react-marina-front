import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InventorySidebarList = (props) => {
  const inventoryList = props.data.map((productItem) => {
    return (
      <div key={productItem._id.$oid} className="portfolio-item-thumb">
        <div className="portfolio-thumb-img">
          <img src={productItem.image} />
        </div>

        <div className="text-content">
          <div className="title">{productItem.name}</div>
          <a
            className="delete-icon"
            onClick={() => props.handleDeleteClick(productItem)}
          >
            <FontAwesomeIcon icon="trash" />
          </a>
        </div>
      </div>
    );
  });

  return <div className="portfolio-sidebar-list-wrapper">{inventoryList}</div>;
};

export default InventorySidebarList;
