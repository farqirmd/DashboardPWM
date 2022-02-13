 import React from "react";

const Footer = () => {
  var d = new Date();
  return (
    <div className="footer">
      <div className="copyright">
        <p>
          Copyright © Developed by{" "}
          <a href="https://antares.id/" target="_blank" rel="noreferrer">
            Antares
          </a>{" "}
          {/* {d.getFullYear()} */}
        </p>
      </div>
    </div>
  );
};

export default Footer;
