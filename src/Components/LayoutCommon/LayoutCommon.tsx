import "antd/dist/antd.css";
import "./LayoutCommon.scss";
import { useState } from "react";
import { Layout } from "antd";
import { scrollToTop } from "src/Utils/Utils";
import SiderCommon from "../SiderCommon/SiderCommon";
import Main from "../../Pages/Main/Main";

const LayoutCommon = () => {
  const [params, setParams] = useState("");

  const handleClickNavLink = (item: any) => {
    setParams(item.key);
    scrollToTop();
  };

  return (
    <Layout>
      <SiderCommon handleClickNavLink={handleClickNavLink} />
      <Layout className="site-layout">
        <Main params={params} />
      </Layout>
    </Layout>
  );
};

export default LayoutCommon;
