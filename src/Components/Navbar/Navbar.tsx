/* eslint-disable array-callback-return */
import "./Navbar.scss";
import { useState } from "react";
import NavLogo from "./NavLogo";
import { capitalizeFirstLetter } from "src/Utils/Utils";

interface NavbarProps {
  params: string;
  breeds: string[];
  handleClickNavLink: (event: any, breed: string) => void;
}

function Navbar(props: NavbarProps) {
  const { breeds, handleClickNavLink, params } = props;
  const listBreed = Object.keys(breeds);

  const handleClick = (event: any, breed: string) => {
    event.preventDefault();
    handleClickNavLink(event, breed);
  };

  return (
    <div className="Navbar Navbar-root ">
      <NavLogo />
      {listBreed.map((breed :string) => (
        <div key={breed} className={`nav-link ${params === breed ? "nav-link-active" : ""}`} >
          <a onClick={(event) => handleClick(event, breed)}>
            {capitalizeFirstLetter(breed)}
          </a>
        </div>
      ))}
    </div>
  );
}

export default Navbar;
