import filterIcon from "../../assets/filter.png";
import sortIcon from "../../assets/sort.png";
import DataModal from "../dataModal";
import FilterModal from "../filterModal";
import FilterPath from "../filterPath";
import "./index.scss";
import useTable from "./useTable";

function Table() {
  const {
    data,
    sortHandler,
    applyFilter,
    searchHandler,
    filterModalState,
    closeFilterModal,
    dataModalState,
    resetFilter,
    filterPath,
    updateDataModal,
    sortKey,
    modalBackDropHandler,
  } = useTable();

  return (
    <div
      className={`table-wrapper ${
        dataModalState.isOpen || filterModalState.isOpen ? "--hasModal" : ""
      }`.trim()}
      onClick={modalBackDropHandler}
    >
      <div className="table-wrapper__heading">
        <h1 className="table-wrapper__heading__title">
          Doci LiveCode Data Table
        </h1>
        <FilterPath filter={filterPath} onReset={resetFilter} />
      </div>
      <table className="table">
        <thead>
          <tr className="table-row table__head">
            {data?.tableColumnsTitle.map((head, idx) => {
              return (
                <th key={idx} className="table-cell">
                  <span className="table__head__cell">
                    <span
                      className={`table__head__sort ${
                        sortKey.key === head ? "--isActive" : ""
                      }`.trim()}
                    >
                      <img
                        src={sortIcon}
                        className={`${sortKey.isAsc ? "--reverse" : ""}`.trim()}
                      />
                    </span>
                    <span onClick={() => sortHandler(head)}>{head}</span>
                    <span
                      onClick={() => searchHandler(head)}
                      className="table__head__cell__search"
                    >
                      <img src={filterIcon} alt="search icon" />
                    </span>
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data?.data.map((row, idx) => (
            <tr
              key={idx}
              onClick={() =>
                updateDataModal({
                  data: row,
                })
              }
              className={`table-row ${
                row.status === "single" ? "--isSingle" : ""
              }`.trim()}
            >
              {Object.values(row).map((val, innerIdx) => {
                return (
                  <td key={innerIdx} className="table-cell">
                    {val ? (val as string | number) : "NaN"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className={`search-modal ${
          filterModalState.isOpen ? "--isOpen" : ""
        }`.trim()}
      >
        <FilterModal
          columnKey={filterModalState.columnKey}
          onFilter={applyFilter}
          onClose={closeFilterModal}
        />
      </div>
      <div
        className={`data-modal ${
          dataModalState.isOpen ? "--isOpen" : ""
        }`.trim()}
      >
        <DataModal
          data={dataModalState.data}
          onClose={() =>
            updateDataModal({
              isClosing: true,
            })
          }
        />
      </div>
    </div>
  );
}

export default Table;
