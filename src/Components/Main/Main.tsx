import "./Main.scss";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import { CircularProgress } from "@mui/material";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Image from "../Image/Image";
import { capitalizeFirstLetter } from "src/Utils/Utils";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconCommon from "../IconCommon/IconCommon";
import Options from "../Options/Options";

interface mainProps {
  children?: any;
  params: string;
}

function Main(props: mainProps) {
  const { params } = props;
  const [listImage, setListImage] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openSlider, setOpenSlider] = useState(false);
  const [currentIndexImage, setCurrentIndexImage] = useState<number>(0);
  const [currentVarient, setCurrentVariant] = useState<string>("woven");

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

  const handleClose = () => setOpenSlider(false);

  const handleClickOnImage = (event: any, url: string) => {
    setOpenSlider(true);
    setCurrentIndexImage(listImage.indexOf(url));
  };

  const handleClickIconLeft = () => {
    setCurrentIndexImage((prev: number) => {
      const next = prev + 1;
      if (next > listImage.length - 1) {
        return (prev = 0);
      }

      return (prev = next);
    });
  };
  const handleClickIconRight = () => {
    setCurrentIndexImage((prev: number) => {
      const previous = prev - 1;
      if (previous < 0) {
        return (prev = listImage.length - 1);
      }

      return (prev = previous);
    });
  };

  const handleChangeOption = (currentVarient: string) => {
    setCurrentVariant(currentVarient);
  };

  return (
    <div className="Main-root Main">
      <Header />
      <Options
        handleChangeOption={handleChangeOption}
        currentVarient={currentVarient}
      />

      {currentVarient === "woven" ? (
        <ImageList variant="woven" cols={3} gap={8}>
          {isLoading && <CircularProgress />}

          {listImage.map((url: string) => (
            <ImageListItem key={url}>
              <Image url={url} handleClickOnImage={handleClickOnImage} />
            </ImageListItem>
          ))}
        </ImageList>
      ) : null}

      {currentVarient === "masonry" ? (
        <ImageList variant="masonry" cols={3} gap={8}>
          {isLoading && <CircularProgress />}

          {listImage.map((url: string) => (
            <ImageListItem key={url}>
              <Image url={url} handleClickOnImage={handleClickOnImage} />
            </ImageListItem>
          ))}
        </ImageList>
      ) : null}

      {currentVarient === "quilted" ? (
        <ImageList variant="quilted" cols={3} gap={8}>
          {isLoading && <CircularProgress />}

          {listImage.map((url: string) => (
            <ImageListItem key={url}>
              <Image url={url} handleClickOnImage={handleClickOnImage} />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <ImageList variant="standard" cols={3} gap={8}>
          {isLoading && <CircularProgress />}

          {listImage.map((url: string) => (
            <ImageListItem key={url}>
              <Image url={url} handleClickOnImage={handleClickOnImage} />
            </ImageListItem>
          ))}
        </ImageList>
      )}

      <ScrollToTop />

      <Modal
        open={openSlider}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="slider-image">
          <Box>
            <IconCommon
              className="arrow-left"
              handleClickIcon={handleClickIconLeft}
            >
              <ArrowForwardIosIcon />
            </IconCommon>
            <Image
              url={listImage[currentIndexImage]}
              handleClickOnImage={handleClickOnImage}
            />

            <IconCommon
              className="arrow-right"
              handleClickIcon={handleClickIconRight}
            >
              <ArrowBackIosNewIcon />
            </IconCommon>

            <div className="breed dog-breed">
              {capitalizeFirstLetter(params)}
            </div>
          </Box>
        </div>
      </Modal>
    </div>
  );
}

export default Main;
