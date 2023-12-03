import "./SeatRow.styles.css";
import { ISeatRows } from "../model/model";
import Seat from "./Seat";

interface ISeatRowsProps extends ISeatRows {
  price: number;
  categoryName: string;
}

function SeatRows({ seats, ...restProps }: ISeatRowsProps) {
  return (
    <div className="seat-row">
      {seats.map((seat) => (
        <Seat {...seat} {...restProps} key={seat.id} />
      ))}
    </div>
  );
}

export default SeatRows;
