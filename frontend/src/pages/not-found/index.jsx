import './style.css'

const NotFound = ({}) => {
  return (
    <div className="notfound-container">
      <h1 style={{color: "#FFF"}}>404 | Not Found</h1>
      <a href="/" style={{color: "#FFF"}}>Click here to return to the main page</a>
    </div>
  );
};

export default NotFound;
