import "./index.scss";

interface IFilterPath {
  filter: string;
  onReset: () => unknown;
}

function FilterPath(props: IFilterPath) {
  const { filter, onReset } = props;

  const steps = filter.split("|");

  return steps.length > 1 ? (
    <div className="filter-path">
      <h2>Applied Filters: </h2>
      <div className="filter-path__tags">
        {steps.map((stp, idx) => (
          <div key={idx} className="filter-path__step">
            {stp}
          </div>
        ))}
      </div>
      <button type="button" className="filter-path__reset" onClick={onReset}>
        Reset Filters
      </button>
    </div>
  ) : null;
}

export default FilterPath;
