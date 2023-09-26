import React from "react";

interface IHeader {
  headerText: string;
  subText: string;
}

const Header: React.FC<IHeader> = ({ headerText, subText }) => {
  return (
    <div>
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">{headerText}</h1>
            <p className="lead fw-normal text-white-50 mb-0">{subText}</p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
