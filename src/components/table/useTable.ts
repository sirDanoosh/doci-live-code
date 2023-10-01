// @ts-nocheck

import { useEffect, useState } from "react";
import makeData from "../../data";

export type TDataType = {
  age: number;
  progress: number;
  status: string;
  subRows: unknown;
  visits: number;
};

export type TUpdateDataModal =
  | {
      data: TDataType;
      isClosing?: boolean;
    }
  | {
      isClosing: boolean;
      data?: TDataType;
    };

function useTable() {
  const [data, setData] = useState<{
    data: Array<TDataType>;
    initialData: Array<TDataType>;
    tableColumnsTitle: Array<string>;
  } | null>(null);
  const [sortKey, setSortKey] = useState<{ key: string; isAsc: boolean }>({
    key: "",
    isAsc: false,
  });
  const [filterModalState, setFilterModalState] = useState<{
    columnKey: string;
    isOpen: boolean;
  }>({
    columnKey: "",
    isOpen: false,
  });
  const [filterPath, setFilterPath] = useState<string>("");
  const [dataModalState, setDataModalState] = useState<{
    data: TDataType | null;
    isOpen: boolean;
  }>({
    data: null,
    isOpen: false,
  });

  function fetchData(rowCount: number) {
    const data = makeData(rowCount);
    const tableColumnsTitle = Object.keys(data[0]);

    setData({
      data: data,
      initialData: data,
      tableColumnsTitle: tableColumnsTitle,
    });
  }

  function sortHandler(sortBy: string) {
    const tempData = data!.data;
    let isAsc = true;

    if (sortBy === sortKey.key) {
      if (sortKey.isAsc) {
        isAsc = false;
      }
    }

    tempData.sort((a: TDataType, b: TDataType) => {
      if (a[sortBy] < b[sortBy]) return isAsc ? -1 : 1;
      else return isAsc ? 1 : -1;
    });

    setData((prev) => ({
      ...prev,
      data: tempData,
    }));

    setSortKey({
      isAsc: isAsc,
      key: sortBy,
    });
  }

  function searchHandler(columnKey: string) {
    setFilterModalState({
      columnKey: columnKey,
      isOpen: true,
    });
  }

  function closeFilterModal() {
    setFilterModalState({
      columnKey: "",
      isOpen: false,
    });
  }

  function applyFilter(val: string) {
    if (!val) return;

    let temp = data!.data;

    temp = temp?.filter((row) =>
      String(row[filterModalState.columnKey]).includes(val)
    );

    setData((prev) => ({
      ...prev,
      data: temp,
    }));

    setFilterModalState({
      columnKey: "",
      isOpen: false,
    });

    setFilterPath((prev) => prev + `${filterModalState.columnKey} = ${val}|`);
  }

  function resetFilter() {
    setData((prev) => ({
      ...prev,
      data: prev?.initialData,
    }));

    setFilterPath("");
  }

  function updateDataModal(props: TUpdateDataModal) {
    const { data, isClosing } = props;

    if (isClosing) {
      setDataModalState({
        data: null,
        isOpen: false,
      });
    } else {
      setDataModalState({
        data: data,
        isOpen: true,
      });
    }
  }

  function modalBackDropHandler(e) {
    const clickTargetClassName = e.target.className;

    if (clickTargetClassName.includes("--hasModal")) {
      setDataModalState({
        data: null,
        isOpen: false,
      });

      setFilterModalState({
        columnKey: "",
        isOpen: false,
      });
    }
  }

  useEffect(() => {
    fetchData(12);
  }, []);

  return {
    data,
    sortHandler,
    searchHandler,
    applyFilter,
    filterModalState,
    closeFilterModal,
    resetFilter,
    filterPath,
    dataModalState,
    updateDataModal,
    sortKey,
    modalBackDropHandler,
  };
}

export default useTable;
