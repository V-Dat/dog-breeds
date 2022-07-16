import { Modal } from "antd";

interface ModalCommonProps {
  isShowModel: boolean;
  handleCloseModel: () => void;
  titleModel?: any;
  children?: any;
  width?: number | string;
  height?: number | string;
  className?: string;
  cancelButtonProps: any;
  okButtonProps: any;
  closable?: boolean;
}

function ModalCommon(props: ModalCommonProps) {
  const {
    isShowModel = false,
    handleCloseModel,
    titleModel,
    children,
    width,
    height,
    className,
    okButtonProps,
    cancelButtonProps,
    closable = true,
  } = props;

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    handleCloseModel();
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    handleCloseModel();
  };

  return (
    <Modal
      closable={closable}
      okButtonProps={okButtonProps}
      cancelButtonProps={cancelButtonProps}
      className={className ? className : ""}
      visible={isShowModel}
      width={width}
      bodyStyle={{ height: height }}
      title={
        titleModel && (
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onFocus={() => undefined}
            onBlur={() => undefined}
          >
            {titleModel}
          </div>
        )
      }
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {children}
    </Modal>
  );
}

export default ModalCommon;
