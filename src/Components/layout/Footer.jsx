import React from "react";
import Newsletter from "./newsletter";
import FooterInfo from "./Footerinfo";

const Footer = () => (
  <footer className="bg-gray-900 text-white pt-8 pb-4">
    <div className="container mx-auto px-4">
      <div className="flex flex-col gap-8">
        <div className="flex-1">
          <Newsletter />
        </div>
        <div className="flex-1">
          <FooterInfo />
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
