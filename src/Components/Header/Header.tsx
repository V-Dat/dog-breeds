import GithubSvg from "src/Assets/Svg/GithubSvg";
import "./Header.scss";
function Header() {
  return (
    <header className="Header-root">
      <h1>FIND DOG YOU LOVE</h1>
      <p>
        List all Dog Breeds Images using Dog.CEO API by Van Dat - The Man who
        loves Dogs.
      </p>
      <GithubSvg />
    </header>
  );
}

export default Header;
