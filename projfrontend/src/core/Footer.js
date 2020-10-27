import React from "react";
//
//          <span class="btn btn-secondary">Kiran Hegde</span>
const Footer = () => {
  return (
    <div>
      <footer className="footer bg-dark mt-auto py-4">
        <div className="container-fluid  text-muted text-center ">
          <span className="text-muted">Images are from </span>
          <a href="https://learncodeonline.in" className="text-warning">
            LCO
          </a>
          <h6 className="text-muted">
            Developed By
            <a href="" className="text-warning">
              Kiran Hegde
            </a>
          </h6>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
