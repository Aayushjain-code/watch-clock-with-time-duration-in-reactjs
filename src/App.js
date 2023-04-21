import { useState } from "react";
import DonutBarGraph from "./DonutBarGraph";
import "./style.css";
import { timeRanges1, timeRanges2, timeRanges3 } from "./timeRanges";

export default function App() {
  const [currentTimeRanges, setCurrentTimeRanges] = useState(timeRanges1);

  const segments = currentTimeRanges.map(({ startTime, endTime }) => {
    const startHour = parseInt(startTime.split(":")[0], 10);
    const startMinute = parseInt(startTime.split(":")[1], 10);
    const endHour = parseInt(endTime.split(":")[0], 10);
    const endMinute = parseInt(endTime.split(":")[1], 10);

    const startDegree = startHour * 15 + startMinute / 4;
    const endDegree = endHour * 15 + endMinute / 4;

    return {
      startDegree,
      endDegree
    };
  });

  return (
    <div className="App">
      <div style={{ margin: "2rem" }}>
        <button
          onClick={() => setCurrentTimeRanges(timeRanges1)}
          className="button-style"
        >
          Instagram
        </button>
        <button
          onClick={() => setCurrentTimeRanges(timeRanges2)}
          className="button-style"
        >
          Facebook
        </button>
        <button
          onClick={() => setCurrentTimeRanges(timeRanges3)}
          className="button-style"
        >
          Snapchat
        </button>
      </div>
      <div className="watchContainer" style={{ width: "400px" }}>
        <DonutBarGraph segments={segments} />
      </div>
    </div>
  );
}
