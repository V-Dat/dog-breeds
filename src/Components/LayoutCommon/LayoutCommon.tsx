import "antd/dist/antd.css";
import "./LayoutCommon.scss";
import { useState } from "react";
import { Layout } from "antd";
import { scrollToTop } from "src/Utils/Utils";
import SiderCommon from "../SiderCommon/SiderCommon";
import Main from "../../Pages/Main/Main";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import ButtonCommon from "../ButtonCommon/ButtonCommon";

const LayoutCommon = () => {
  const [params, setParams] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const handleClickNavLink = (item: any) => {
    setParams(item.key);
    scrollToTop();
    setCollapsed(true);
  };

  const handleClickButton = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout>
      <ButtonCommon
        handleClick={handleClickButton}
        className="button-collapsed"
      >
        {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      </ButtonCommon>
      <SiderCommon
        handleClickNavLink={handleClickNavLink}
        collapsed={collapsed}
      />
      <Layout className="site-layout">
        <Main params={params} />
      </Layout>
    </Layout>
  );
};

export default LayoutCommon;
