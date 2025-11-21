import "./style.home-header.css";
import Button from "../button/Button";
import Add from "../../assets/add.svg";
import HomeLogo from "../../components/home-logo/HomeLogo.jsx";

const HomeHeader = ({ btnOnClick }) => {
  return (
    <header className="home-header">
      <HomeLogo/>
      <Button text="Add Expense" onClick={btnOnClick} icon={Add} />
    </header>
  );
};

export default HomeHeader;
