import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Leaf } from "../assets/leaf.svg";

export default function Logo() {
  return (
    <div>
      <Link to="./home" className="leaf-text-logo link-element" >
        <Leaf className="leaf-svg" />
        <h1 className="logo-text">Plantae</h1>
      </Link>
    </div>
  );
}
