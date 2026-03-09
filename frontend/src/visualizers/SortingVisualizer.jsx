import "./sorting.css";

function SortingVisualizer({ state }) {

  if (!state) return null;

  const { array, compare, swapped } = state;

  return (
    <div className="sorting-container">

      {array.map((value, index) => {

        let className = "bar";

        if (compare?.includes(index)) {
          className += " compare";
        }

        if (swapped?.includes(index)) {
          className += " swap";
        }

        return (
          <div
            key={index}
            className={className}
            style={{ height: `${value * 20}px` }}
          >
            <span className="bar-value">{value}</span>
          </div>
        );
      })}

    </div>
  );
}

export default SortingVisualizer;