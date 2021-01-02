import React from "react";
//

const Footer = () => {
  return (
    <div>
      <footer className="footer bg-dark mt-auto py-4 footer-custom">
        <div className="container-fluid  text-muted text-center ">
          <span className="text-muted">Images are from </span>
          <a href="https://learncodeonline.in" className="text-success">
            LCO
          </a>
          <h6 className="text-muted">
            Developed By
            <a
              href="https://github.com/kiran-web-dev/"
              className="text-warning"
            >
              Kiran Hegde
            </a>
          </h6>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
