import React from 'react';
import PieChart from './PieChart'; // เปลี่ยนเส้นทางตามที่จัดเก็บ PieChart component

const App: React.FC = () => {
  return (
    <div>
      <h1>My App</h1>
      <PieChart />
    </div>
  );
};

export default App;
