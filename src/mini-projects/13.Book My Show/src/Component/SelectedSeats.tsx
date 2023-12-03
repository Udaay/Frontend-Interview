import { UseSeats } from "../reducer/reducer";

function SelectedSeats() {
  const {
    state: {
      selected: { seatList, totalPrice },
    },
  } = UseSeats();

  return (
    <div>
      {seatList?.length > 0 && (
        <div>
          <div>Selected Seat</div>
          <div>
            Total Selected Seats
            <strong>{` ${seatList.length}`}</strong>
          </div>
          <div>
            Total Price
            <strong>{` Rs. ${totalPrice}`}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectedSeats;
