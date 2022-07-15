import db from "src/data/db.json";
import { Fragment } from "react";
import { Image } from "antd";
import { shuffledArr } from "src/Utils/Utils";
function Greeting() {
  const listImage = shuffledArr([...db.image, ...db.videos]);

  return (
    <div className="list-image">
      <Image.PreviewGroup>
        {listImage.map((url: string) => (
          <Fragment key={url}>
            {url.includes(".jpg") ? (
              <Image
                width={200}
                src={process.env.PUBLIC_URL + url}
                preview={true}
              />
            ) : (
              <video width="200" height="auto" controls>
                <source src={process.env.PUBLIC_URL + url} type="video/mp4" />
              </video>
            )}
          </Fragment>
        ))}
      </Image.PreviewGroup>
    </div>
  );
}

export default Greeting;
