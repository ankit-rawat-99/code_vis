import "./searching.css";

function SearchingVisualizer({ state }) {

  if (!state) return null;

  const { array, current, left, right, mid, found } = state;

  return (
    <div className="search-container">

      <h3>Searching Visualization</h3>

      <div className="search-array">
        {array.map((value, index) => {

          let className = "search-item";

          if (index === current) className += " current";
          if (index === mid) className += " mid";
          if (index >= left && index <= right)
            className += " range";
          if (found && index === current)
            className += " found";

          return (
            <div key={index} className={className}>
              {value}
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default SearchingVisualizer;