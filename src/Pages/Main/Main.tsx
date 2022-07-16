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
import ImageCommon from "src/Components/ImageCommon/ImageCommon";
import ModalCommon from "src/Components/ModalCommon/ModalCommon";
import ButtonCommon from "src/Components/ButtonCommon/ButtonCommon";
import { getNextIndex, getPreviousIndex, shuffledArr } from "src/Utils/Utils";
import data from "src/data/data.js";

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
  const [currentSize, setCurrentSize] = useState({});
  const imageRef = useRef<HTMLImageElement>();

  useEffect(() => {
    async function doGetRequest() {
      const controller = new AbortController();
      setIsLoading(true);

      const res = await axios.get(`https://dog.ceo/api/breed/${params}/images`);
      setListImage(shuffledArr(res.data.message));

      setIsLoading(false);
      controller.abort();
    }
    if (params !== "") {
      doGetRequest();
    } else {
      const listImage = shuffledArr([...data.image, ...data.videos]);
      setListImage(listImage);
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
            <ButtonCommon handleClick={handleZoomIn}>
              <ZoomInOutlined />
            </ButtonCommon>

            <ButtonCommon handleClick={handleZoomOut}>
              <ZoomOutOutlined />
            </ButtonCommon>

            <ButtonCommon handleClick={handleClickPrevious}>
              <LeftOutlined />
            </ButtonCommon>

            <ButtonCommon handleClick={handleClickNext}>
              <RightOutlined />
            </ButtonCommon>
            <ButtonCommon handleClick={handleClickRoutateLeft}>
              <RotateLeftOutlined />
            </ButtonCommon>

            <ButtonCommon handleClick={handleClickRoutateRight}>
              <RotateRightOutlined />
            </ButtonCommon>

            <ButtonCommon handleClick={handleCloseModel}>
              <CloseOutlined />
            </ButtonCommon>
          </div>
        )}
      </Header>

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
