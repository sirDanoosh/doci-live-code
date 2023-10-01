import { TDataType } from "../table/useTable";
import "./index.scss";

interface IDataModal {
  data?: TDataType | null;
  onClose: () => unknown;
}

function DataModal(props: IDataModal) {
  const { data, onClose } = props;

  return data ? (
    <div className="data-modal">
      <h2 className="data-modal__title">Data Modal</h2>
      <div onClick={onClose} className="data-modal__close-btn">
        X
      </div>
      {Object.keys(data).map((dat, idx) => {
        return (
          <div key={idx} className="data-modal__row">
            <span className="data-modal__row__title">{dat}</span>
            <span>:</span>
            {/* @ts-expect-error */}
            <span className="data-modal__row__val">{data[dat] || "NaN"}</span>
          </div>
        );
      })}
    </div>
  ) : null;
}

export default DataModal;
