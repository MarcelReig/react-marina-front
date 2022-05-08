import React from "react";
import profilePicture from "../../images/bio/marina.jpeg";

export default function () {
  return (
    <div className="content-page-wrapper">
      <div
        className="left-column"
        style={{
          background: "url(" + profilePicture + ") no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="right-column">
        De petita era calba, després em van sortir quatre rínxols al clatell,
        ara els tenc llisos a l'hivern i arrissats a l'estiu, per l'aigua de la
        mar. Vaig aprendre a nedar només amb el braç dret, amb l'altre em tapava
        el nas per por que m'entrés aigua, m'hagués agradat néixer peix, peix
        volador, però al manco els meus pares em van posar Marina.
      </div>
    </div>
  );
}
