import "./style.view-password-button.css";
import Visibilty from "../../assets/visibility.svg";
import VisibiltyOff from "../../assets/visibility_off.svg";

const ViewPassWordButton = ({ isVisible, setVisible }) => {
  return (
    <button
      type="button"
      className="view-password-button"
      onClick={() => setVisible(!isVisible)}
    >
      <img src={isVisible ? Visibilty : VisibiltyOff} />
    </button>
  );
};

export default ViewPassWordButton;
