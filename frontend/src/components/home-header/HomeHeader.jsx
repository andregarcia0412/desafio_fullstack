import "./style.home-header.css";
import Button from "../button/Button";
import Add from "../../assets/add.svg";
import HomeLogo from "../../components/home-logo/HomeLogo.jsx";

const HomeHeader = ({ btnOnClick, userName }) => {
  return (
    <header className="home-header">
      <div className="main-content">
        <HomeLogo userName={userName}/>
        <Button text="Add Expense" onClick={btnOnClick} icon={Add} />
      </div>
      <button id="logout-button" onClick={() => {
        localStorage.clear()
        window.location.href = "/auth"
      }
      }>Logout</button>
    </header>
  );
};

export default HomeHeader;
