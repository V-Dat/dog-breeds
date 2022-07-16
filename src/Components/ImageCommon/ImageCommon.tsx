import { forwardRef } from "react";

interface ImageCommonProps {
  src: string;
  handleClickOnImage?: (event: any, data: string) => void;
  className?: string;
  width?: number;
  style?: any;
}

function ImageCommon(props: ImageCommonProps, imageRef: any) {
  const { src, className, handleClickOnImage, width, style } = props;
  const handleClick = (event: any, src: string) => {
    if (handleClickOnImage) {
      handleClickOnImage(event, src);
    }
  };
  return (
    <div
      className={`${className ? className : ""} ImageCommon-root`}
      onClick={(event: any) => handleClick(event, src)}
    >
      {src.includes("mp4") ? (
        <video width={width} ref={imageRef} style={style} controls>
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <img src={src} width={width} ref={imageRef} style={style} />
      )}
    </div>
  );
}

export default forwardRef(ImageCommon);
