import "./Main.scss";
import {
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";

import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import Header from "../../Components/Header/Header";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";

import { Spin } from "antd";
import Greeting from "src/Components/Greeting/Greeting";
import ImageCommon from "src/Components/ImageCommon/ImageCommon";
import ModalCommon from "src/Components/ModalCommon/ModalCommon";
import ButtonCommon from "src/Components/ButtonCommon/ButtonCommon";
import { getNextIndex, getPreviousIndex } from "src/Utils/Utils";

interface mainProps {
  children?: any;
  params: string;
}

function Main(props: mainProps) {
  const { params } = props;
  const [listImage, setListImage] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModel, setIsShowModel] = useState(false);
  const [currentSrc, setCurrentSrc] = useState("");
  const [rotation, setRotation] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0, scale: 1 });
  const [currentSize, setCurrentSize] = useState({});
  const imageRef = useRef<HTMLImageElement>();

  useEffect(() => {
    async function doGetRequest() {
      const controller = new AbortController();
      setIsLoading(true);

      const res = await axios.get(`https://dog.ceo/api/breed/${params}/images`);
      setListImage(res.data.message);

      setIsLoading(false);
      controller.abort();
    }
    if (params !== "") {
      doGetRequest();
    }
  }, [params]);

  const handleClickOnImage = (undefined: any, src: string) => {
    setCurrentSrc(src);
    setIsShowModel(true);
    setCurrentSize({});
  };

  const handleCloseModel = () => {
    setIsShowModel(false);
    setCurrentSize({});
  };

  const handleClickNext = () => {
    const nextIndex = getNextIndex(listImage, currentSrc);
    setCurrentSrc(listImage[nextIndex]);
    setCurrentSize({});
  };

  const handleClickPrevious = () => {
    const previousIndex = getPreviousIndex(listImage, currentSrc);
    setCurrentSrc(listImage[previousIndex]);
    setCurrentSize({});
  };

  const handleClickRoutateLeft = () => {
    setRotation((prev) => prev - 90);
    setCurrentSize({});
  };

  const handleClickRoutateRight = () => {
    setRotation((prev) => prev + 90);
    setCurrentSize({});
  };

  const handleZoomIn = () => {
    if (imageRef.current !== undefined) {
      const height = imageRef.current.clientHeight;
      const width = imageRef.current.clientWidth;
      setCurrentSize({ height: height + 65, width: width + 65 });
    }
  };

  const handleZoomOut = () => {
    if (imageRef.current !== undefined) {
      const height = imageRef.current.clientHeight;
      const width = imageRef.current.clientWidth;
      setCurrentSize({ height: height - 65, width: width - 65 });
    }
  };

  return (
    <div className="Main-root Main">
      <Header>
        {isShowModel && (
          <div className="button-feature">
            <ButtonCommon handleClickButton={handleZoomIn}>
              <ZoomInOutlined />
            </ButtonCommon>

            <ButtonCommon handleClickButton={handleZoomOut}>
              <ZoomOutOutlined />
            </ButtonCommon>

            <ButtonCommon handleClickButton={handleClickPrevious}>
              <LeftOutlined />
            </ButtonCommon>

            <ButtonCommon handleClickButton={handleClickNext}>
              <RightOutlined />
            </ButtonCommon>
            <ButtonCommon handleClickButton={handleClickRoutateLeft}>
              <RotateLeftOutlined />
            </ButtonCommon>

            <ButtonCommon handleClickButton={handleClickRoutateRight}>
              <RotateRightOutlined />
            </ButtonCommon>

            <ButtonCommon handleClickButton={handleCloseModel}>
              <CloseOutlined />
            </ButtonCommon>
          </div>
        )}
      </Header>

      {/* {params === "" && <Greeting />} */}

      {isLoading && params !== "" ? (
        <Spin spinning={isLoading} size="large" />
      ) : (
        <div className="list-image">
          {listImage.map((url: string) => (
            <Fragment key={url}>
              <ImageCommon
                key={url}
                width={200}
                src={url}
                handleClickOnImage={handleClickOnImage}
              />
            </Fragment>
          ))}
        </div>
      )}

      <ModalCommon
        className="preview-modal"
        isShowModel={isShowModel}
        // width={"100%"}
        // height={"400"}
        handleCloseModel={handleCloseModel}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        closable={false}
      >
        <ImageCommon
          src={currentSrc}
          handleClickOnImage={handleClickOnImage}
          style={{
            transformOrigin: "center center",
            transform: `rotate(${rotation}deg)`,
            ...currentSize,
          }}
          ref={imageRef}
        />
      </ModalCommon>
      <ScrollToTop />
    </div>
  );
}

export default Main;
