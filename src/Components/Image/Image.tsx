import "./Image.scss";

interface imageProps {
  url: string;
  handleClickOnImage?: any;
}

function Image(props: imageProps) {
  const { url, handleClickOnImage } = props;

  return (
    <img
      className="Image-root"
      src={`${url}?w=161&fit=crop&auto=format`}
      srcSet={`${url}?w=161&fit=crop&auto=format&dpr=2 2x`}
      alt={"dog"}
      loading="lazy"
      onClick={
        handleClickOnImage
          ? (event) => handleClickOnImage(event, url)
          : () => {}
      }
    />
  );
}

export default Image;
