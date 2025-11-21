import "./style.home-logo.css";
import Logo from "../../assets/wallet.png";

const HomeLogo = () => {
  return (
    <div className="logo">
      <div className="icon-container">
        <img src={Logo} />
      </div>
      <div className="logo-title">
        <h1>Appzinho Legal</h1>
        <p>Expense Dashboard</p>
      </div>
    </div>
  );
};

export default HomeLogo;
