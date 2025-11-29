import "./style.button.css";

const Button = ({ icon, text, onClick, width, fontSize }) => {
  return (
    <button
      className="icon-button"
      onClick={() => {
        onClick();
      }}
      style={{ width: width, fontSize:fontSize }}
    >
      {icon && <img src={icon} />}
      {text}
    </button>
  );
};

export default Button;
