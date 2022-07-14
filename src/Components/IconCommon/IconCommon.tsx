interface iconProps {
  className: string;
  children: any;
  handleClickIcon?: any;
}

function IconCommon(props: iconProps) {
  const { children, className, handleClickIcon } = props;
  return (
    <div className={className} onClick={handleClickIcon}>
      {children}
    </div>
  );
}

export default IconCommon;
