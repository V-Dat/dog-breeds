import "./SiderCommon.scss";
import axios from "axios";
import NavLogo from "../Navbar/NavLogo";
import { Layout, Menu, Spin } from "antd";
import { useEffect, useState } from "react";
const { Sider } = Layout;

interface LayoutCommonProps {
  breeds?: any;
  handleClickNavLink: (item: any) => void;
}
function SiderCommon(props: LayoutCommonProps) {
  const { handleClickNavLink } = props;
  const [breeds, setBreeds] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);

    async function doGetRequest() {
      const res = await axios.get("https://dog.ceo/api/breeds/list/all");
      setBreeds(Object.keys(res.data.message));

      controller.abort();
    }

    setIsLoading(false);
    doGetRequest();
  }, []);

  return (
    <Sider breakpoint="lg" collapsedWidth="0" theme="light" width="300px">
      <NavLogo />
      <Spin spinning={isLoading} size="large" />

      <Menu
        onClick={handleClickNavLink}
        // theme="light"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={breeds.map((item: string) => ({
          key: item,
          label: item,
        }))}
      />
    </Sider>
  );
}

export default SiderCommon;