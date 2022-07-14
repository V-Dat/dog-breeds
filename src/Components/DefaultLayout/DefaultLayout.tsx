import "./DefaultLayout.scss";

interface defaultLayoutProps {
  children: any;
}

function DefaultLayout(props: defaultLayoutProps) {
  const { children } = props;
  return <div className="DefaultLayout-root DefaultLayout">{children}</div>;
}

export default DefaultLayout;
