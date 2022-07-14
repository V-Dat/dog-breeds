import "./App.scss";
import Footer from "src/Components/Footer/Footer";
import Main from "src/Components/Main/Main";
import Navbar from "./Components/Navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import DefaultLayout from "src/Components/DefaultLayout/DefaultLayout";
import { scrollToTop } from "./Utils/Utils";

function App() {
  const [breeds, setBreeds] = useState<any>([]);
  const [params, setParams] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function doGetRequest() {
      const res = await axios.get("https://dog.ceo/api/breeds/list/all");
      setBreeds(res.data.message);

      controller.abort();
    }

    doGetRequest();
  }, []);

  const handleClickNavLink = (event: any, params: string) => {
    setParams(params);
    scrollToTop();
  };
  return (
    <div className="App-root App">
      <DefaultLayout>
        <Navbar
          breeds={breeds}
          params={params}
          handleClickNavLink={handleClickNavLink}
        />
        <Main params={params} />
      </DefaultLayout>
      <Footer />
    </div>
  );
}

export default App;
