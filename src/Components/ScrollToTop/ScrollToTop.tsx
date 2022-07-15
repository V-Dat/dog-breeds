import "./ScrollToTop.scss";
import { useState } from "react";
import { scrollToTop } from "src/Utils/Utils";

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const handleScrollToTop = () => {
    scrollToTop();
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div
      className="ScrollToTop-root scroll-to-top"
      onClick={handleScrollToTop}
      style={{ display: visible ? "inline" : "none" }}
    >
      ↑
    </div>
  );
}

export default ScrollToTop;
