import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LineChart from './LineChart'; // Import LineChart component

const ChartWithData = () => {
  const [chartData, setChartData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://f33f-111-88-233-55.ngrok-free.app/api/products', {
        headers: {
          'ngrok-skip-browser-warning': 'avoid',
        },
      });
      // Assuming the API response contains data in the format expected by the LineChart component
      setChartData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Product Sales Chart</h1>
      {chartData ? (
        <LineChart data={chartData} options={{}} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ChartWithData;
