interface ButtonCommonProps {
  handleClickButton?: any;
  children?: any;
}
function ButtonCommon(props: ButtonCommonProps) {
  const { handleClickButton, children } = props;
  const handleClick = () => {
    handleClickButton && handleClickButton();
  };
  return <div onClick={handleClick}>{children}</div>;
}

export default ButtonCommon;
