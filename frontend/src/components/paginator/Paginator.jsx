import Next from "../../assets/next.png";
import Previous from "../../assets/previous.png";
import "./style.paginator.css"

const Paginator = ({perPage, array, setPage, page}) => {
  return (
    <div className="paginator">
      <button
        className="paginator-btn"
        disabled={page == 1}
        onClick={() => setPage(page - 1)}
      >
        <img src={Previous} />
      </button>

      <span>
        {page} / {Math.ceil(array.length / perPage)}
      </span>

      <button
        className="paginator-btn"
        disabled={page >= Math.ceil(array.length / perPage)}
        onClick={() => setPage(page + 1)}
      >
        <img src={Next} />
      </button>
    </div>
  );
};

export default Paginator;
