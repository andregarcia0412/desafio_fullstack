import React from "react";
import Next from "../../assets/next.png";
import Previous from "../../assets/previous.png";
import "./style.paginator.css"

const Paginator = ({perPage, array, setPage, page}) => {
  const totalPages = Math.ceil(array.length / perPage)
  React.useEffect(() => {
    if(page > totalPages){
      setPage(totalPages > 0 ? totalPages : 1)
    }
  }, [array.length])


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
