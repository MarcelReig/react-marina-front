import React from "react";
import { useParams } from "react-router-dom";

export default function PortfolioDetail(props) {
  let { slug } = useParams();
  return (
    <div>
      <h2>Portfolio Detail for {slug}</h2>
    </div>
  );
}
