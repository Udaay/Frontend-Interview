import "./Seat.styles.css";
import { ISeat } from "../model/model";
import { UseSeats } from "../reducer/reducer";

export interface ISeatProps extends ISeat {
  rowNumber: string;
  price: number;
  categoryName: string;
}

function Seat(props: ISeatProps) {
  const { dispatch } = UseSeats();
  const { seatNumber, status } = props;
  const clickHandler = (e) => {
    if (status !== "AVAILABLE") return;
    e.target.classList.toggle("seat-selected");
    dispatch({ type: "toggle", seat: { ...props } });
  };

  return (
    <div className={`seat ${status}`} onClick={(e) => clickHandler(e)}>
      {status === "BLOCKED" ? "X" : seatNumber}
    </div>
  );
}

export default Seat;
