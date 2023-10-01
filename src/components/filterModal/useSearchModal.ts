import { SyntheticEvent } from "react";
import { IFilterModal } from ".";

type TUseFilterModal = Pick<IFilterModal, "onFilter">;

function useFilterModal(props: TUseFilterModal) {
  const { onFilter } = props;

  function onFormSubmit(e: SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();

    const target = e.target as typeof e.target & {
      searchValue: { value: string };
    };

    onFilter(target.searchValue.value);
  }

  return {
    onFormSubmit,
  };
}

export default useFilterModal;
