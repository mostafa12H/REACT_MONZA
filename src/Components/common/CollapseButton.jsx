import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const CollapseButton = ({ toggleCollapse }) => {
  return (
    <div className="flex ">
      {toggleCollapse ? (
        <FaBars className="text-2xl cursor-pointer" onClick={toggleCollapse} />
      ) : (
        <FaTimes className="text-2xl cursor-pointer" onClick={toggleCollapse} />
      )}
    </div>
  );
};

export default CollapseButton;
