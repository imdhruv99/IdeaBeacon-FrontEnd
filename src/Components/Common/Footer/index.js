import "./Footer.css";

import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Juniper Networks. All rights reserved.</p>
      <p className="developer-info">
        Developed by <a href="mailto:dprajapati@juniper.net">Dhruv Prajapati</a> 👨🏻‍💻
      </p>
    </footer>
  );
};

export default Footer;
