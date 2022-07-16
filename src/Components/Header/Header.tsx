import GithubSvg from "src/Assets/Svg/GithubSvg";
import "./Header.scss";
interface HeaderProps {
  children?: any;
}
function Header(props: HeaderProps) {
  const { children } = props;

  return (
    <header className="Header-root">
      <h1>FIND DOG YOU LOVE</h1>
      <p>
        List all Dog Breeds Images using Dog.CEO API by Van Dat - The Man who
        loves Dogs.
      </p>
      <GithubSvg />
      {children}
    </header>
  );
}

export default Header;
