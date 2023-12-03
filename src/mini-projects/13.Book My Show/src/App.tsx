import "./App.css";
import SeatArrangement from "./Component/SeatArrangement";
import { SeatProvider } from "./reducer/reducer";

function App() {
  return (
    <SeatProvider>
      <SeatArrangement />
    </SeatProvider>
  );
}

export default App;
