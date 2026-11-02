
import { useState, useEffect } from "react";

function AdvancedCounter() {

  // Get saved count from local storage
  const [count, setCount] = useState(() => {
    return Number(localStorage.getItem("counter") || 0);
  });

  // Store count history
  const [history, setHistory] = useState(() => [
    Number(localStorage.getItem("counter") || 0)
  ]);

  // Store step value
  const [step, setStep] = useState(1);

  // Store save message
  const [saveStatus, setSaveStatus] = useState("Changes saved.");

  // Increase count
  function increment() {
    const newCount = count + step;

    setCount(newCount);
    setHistory((previousHistory) => [...previousHistory, newCount]);
  }

  // Decrease count
  function decrement() {
    const newCount = count - step;

    setCount(newCount);
    setHistory((previousHistory) => [...previousHistory, newCount]);
  }

  // Reset count and history
  function reset() {
    setCount(0);
    setHistory([0]);
  }

  // Save count to local storage
  useEffect(() => {
    setSaveStatus("Saving...");

    const timer = setTimeout(() => {
      localStorage.setItem("counter", count);
      setSaveStatus("Changes saved.");
    }, 500);

    // Clear old timer
    return () => clearTimeout(timer);

  }, [count]);

  // Handle keyboard events
  useEffect(() => {

    function handleKeyPress(event) {

      // Increase count with ArrowUp
      if (event.key === "ArrowUp") {
        setCount((previousCount) => {
          const newCount = previousCount + step;

          setHistory((previousHistory) => [...previousHistory, newCount]);

          return newCount;
        });
      }

      // Decrease count with ArrowDown
      if (event.key === "ArrowDown") {
        setCount((previousCount) => {
          const newCount = previousCount - step;

          setHistory((previousHistory) => [...previousHistory, newCount]);

          return newCount;
        });
      }
    }

    document.addEventListener("keydown", handleKeyPress);

    // Remove keyboard event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };

  }, [step]);

  return (
    <div>
      <h1>Advanced Counter</h1>

      <h2>Current Count: {count}</h2>

      <button onClick={decrement}>
        Decrement
      </button>

      <button onClick={increment}>
        Increment
      </button>

      <button onClick={reset}>
        Reset
      </button>

      <br /><br />

      <label>Step Value: </label>

      <input
        type="number"
        min="1"
        value={step}
        onChange={(e) => setStep(Math.max(1, Number(e.target.value)))}
      />

      <p>{saveStatus}</p>

      <h3>Count History:</h3>

      <p>Previous counts: {history.join(", ")}</p>

      <p>
        Use ArrowUp to increment and ArrowDown to decrement.
      </p>

    </div>
  );
}

export default AdvancedCounter;

