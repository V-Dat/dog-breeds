import "./Main.scss";

import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";

import { Image, Spin } from "antd";
import Greeting from "src/Components/Greeting/Greeting";

interface mainProps {
  children?: any;
  params: string;
}

function Main(props: mainProps) {
  const { params } = props;
  const [listImage, setListImage] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="Main-root Main">
      <Header />

      {params ==="" && <Greeting/>} 

      {isLoading && params !== "" ? (
        <Spin spinning={isLoading} size="large" />
      ) : (
        <div className="list-image">
          <Image.PreviewGroup>
            {listImage.map((url: string) => (
              <Fragment key={url}>
                <Image width={200} src={url} preview={true} />
              </Fragment>
            ))}
          </Image.PreviewGroup>
        </div>
      )}

      <ScrollToTop />
    </div>
  );
}

export default Main;
