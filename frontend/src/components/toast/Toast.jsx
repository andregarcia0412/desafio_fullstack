import "./style.toast.css";
import CheckCircle from "../../assets/check_circle.svg";
import React from "react";

const Toast = ({ text, isVisible, setVisible, setShoulShowToast }) => {
  let timer, timer2;
  React.useEffect(() => {
    if (!isVisible) {
      return;
    }

    timer = setTimeout(() => {
      setVisible(false);
      timer2 = setTimeout(() => {
        onClose(false);
      }, 300);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [isVisible]);

  return (
    <div className={`toast ${isVisible ? "show" : "hide"}`}>
      <img src={CheckCircle} />
      <p>{text}</p>
    </div>
  );
};

export default Toast;
