import "./style.home-logo.css";
import Logo from "../../assets/wallet.png";

const HomeLogo = ({userName}) => {
  return (
    <div className="logo">
      <div className="logo-icon-container">
        <img src={Logo} />
      </div>
      <div className="logo-title">
        <h1>{userName}</h1>
        <p>Expense Dashboard</p>
      </div>
    </div>
  );
};

export default HomeLogo;
