import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useFlag } from "./context/index";

function App() {
  const {
    state: { isReact, isVite },
    dispatch,
  } = useFlag();

  console.log({ isReact, isVite });

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch({ type: "isReact", payload: true });
      dispatch({ type: "isVite", payload: true });
    }, 1000);

    () => {
      clearTimeout(timerId);
    };
  }, []);
  return (
    <div className="App">
      <div>
        {isReact && (
          <a href="https://reactjs.org" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        )}
        {isVite && (
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
        )}
      </div>
      <h1>React + Vite</h1>
      <h2>On CodeSandbox!</h2>
      <div className="card">
        <button
          onClick={() =>
            dispatch({ type: "isReact", payload: Math.random() > 0.5 })
          }
        >
          To Check Dispatch Method
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR.
        </p>

        <p>
          Tip: you can use the inspector button next to address bar to click on
          components in the preview and open the code in the editor!
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
