import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto'; // Ensure you import from 'chart.js/auto' for tree shaking

const App: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const dataPie = {
        labels: ["JavaScript", "Python", "Ruby"],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100],
            backgroundColor: [
              "rgb(133, 105, 241)",
              "rgb(164, 101, 241)",
              "rgb(101, 143, 241)",
            ],
            hoverOffset: 4,
          },
        ],
      };
      const configPie = {
        type: "pie" as const,
        data: dataPie,
        options: {},
      };

      new Chart(chartRef.current, configPie);
    }
  }, []);

  return (
    <div>
      <canvas id="chartPie" ref={chartRef}></canvas>
    </div>
  );
};

export default App;
