interface ButtonCommonProps {
  handleClick?: any;
  children?: any;
  className?: string;
}
function ButtonCommon(props: ButtonCommonProps) {
  const { handleClick, children, className } = props;
  const handleClickButton = () => {
    handleClick && handleClick();
  };
  return (
    <div
      className={`${className ? className : ""} ButtonCommon-root`}
      onClick={handleClickButton}
    >
      {children}
    </div>
  );
}

export default ButtonCommon;
