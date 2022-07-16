import { Modal } from 'antd';
import { useRef, useState, forwardRef } from 'react';
import Draggable from 'react-draggable';
import type { DraggableData, DraggableEvent } from 'react-draggable';

interface DraggableModalCommonProps {
  isShowModel: boolean;
  handleCloseModel?: () => void;
  titleModel?: any;
  children?: any;
  width?: number | string;
  height?: number | string;
}
const DraggableModalCommon = (props: DraggableModalCommonProps) => {
  const { isShowModel = false, handleCloseModel, titleModel, children, width = 700, height = 400 } = props;

  const [disabled, setDisabled] = useState(false);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const draggleRef = useRef<HTMLDivElement>(null);

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    handleCloseModel && handleCloseModel();
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    handleCloseModel && handleCloseModel();
  };

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <Modal
      width={width}
      bodyStyle={{ height: height }}
      title={
        titleModel && (<div
          style={{
            width: '100%',
            cursor: 'move',
          }}
          onMouseOver={() => {
            if (disabled) {
              setDisabled(false);
            }
          }}
          onMouseOut={() => {
            setDisabled(true);
          }}
          onFocus={() => undefined}
          onBlur={() => undefined}
        >
          {titleModel}
        </div>)
      }
      visible={isShowModel}
      onOk={handleOk}
      onCancel={handleCancel}

      modalRender={modal => (
        <Draggable
          disabled={disabled}
          bounds={bounds}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
    >
      {children}
      <p>
        Just don&apos;t learn physics at school and your life will be full of magic and miracles.
      </p>
      <br />
      <p>Day before yesterday I saw a rabbit, and yesterday a deer, and today, you.</p>
    </Modal>
  );
};

export default forwardRef(DraggableModalCommon);
