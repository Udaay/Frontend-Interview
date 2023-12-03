import SeatRows from "./SeatRows";
import "./SeatArrangement.styles.css";
import { UseSeats } from "../reducer/reducer";
import Seat from "./Seat";
import SelectedSeats from "./SelectedSeats";

function SeatArrangement() {
  const {
    state: { categories, selected },
  } = UseSeats();
  // const [categories] = useState<ISeatCategory[]>(seatArrangement.categories);

  return (
    <div>
      <h3>Book Seat</h3>
      {categories.map(({ seatRows, ...restProps }) => (
        <div key={restProps.categoryName}>
          <div className="category-label">
            <span>{`${restProps.categoryName} Rs. ${restProps.price}`}</span>
          </div>

          {seatRows.map(({ seats, rowNumber }) => (
            <div className="row-wrapper" key={rowNumber}>
              <div className="row-label">{rowNumber}</div>
              <SeatRows seats={seats} rowNumber={rowNumber} {...restProps} />
            </div>
          ))}
        </div>
      ))}
      <SelectedSeats />
    </div>
  );
}

export default SeatArrangement;
