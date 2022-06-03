import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InventorySidebarList = (props) => {
  const inventoryList = props.data.map((inventoryItem) => {
    return (
      <div key={inventoryItem._id.$oid} className="portfolio-item-thumb">
        <div className="portfolio-thumb-img">
          <img src={inventoryItem.image} />
        </div>

        <div className="text-content">
          <div className="title">{inventoryItem.name}</div>
          <a
            className="delete-icon"
            onClick={() => props.handleDeleteClick(inventoryItem)}
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
