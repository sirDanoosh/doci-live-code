import "./index.scss";
import useFilterModal from "./useSearchModal";

export interface IFilterModal {
  columnKey: string;
  onFilter: (val: string) => unknown;
  onClose: () => unknown;
}

function FilterModal(props: IFilterModal) {
  const { columnKey, onFilter, onClose } = props;
  const { onFormSubmit } = useFilterModal({ onFilter });

  return columnKey ? (
    <form
      className="filter-form form"
      onSubmit={onFormSubmit}
      autoComplete="off"
    >
      <h2 className="form__title">
        <span>Filter on</span>
        <span>{columnKey}</span>
      </h2>
      <input
        autoFocus
        className="form__input"
        placeholder="enter a value ... "
        name="searchValue"
        autoComplete="off"
      />
      <div className="form__btn-wrapper">
        <button type="submit" className="form__submit-btn">
          Search
        </button>
        <button type="button" onClick={onClose} className="form__close-btn">
          Close
        </button>
      </div>
    </form>
  ) : null;
}

export default FilterModal;
