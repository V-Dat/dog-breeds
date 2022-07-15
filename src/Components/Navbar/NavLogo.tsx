import "./NavLogo.scss";

function NavLogo() {
  return (
    <div className="NavLogo-root navLogo">
      <div className="navLogo__image">
        <a className="no-border" href="/">
          <img
            src="https://dog.ceo/img/dog-api-logo.svg"
            className="logo"
            width={"80px"}
            height={"80px"}
          />
        </a>
      </div>
      <h1 className="navLogo__title">DOG API</h1>
    </div>
  );
}

export default NavLogo;
