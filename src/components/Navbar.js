import React from "react";

const Navbar = ({ address }) => {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 px-3 shadow">
      <a
        className="navbar-brand col-sm-3 col-md-2"
        href="http://www.dappuniversity.com/bootcamp"
        target="_blank"
        rel="noopener noreferrer"
      >
        EthSwap
      </a>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
          <small className="text-secondary">
            <small id="account">{address}</small>
          </small>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
