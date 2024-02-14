import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const DashboardCard = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const Title = styled.h2`
  color: #333333;
  margin-bottom: 10px;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <DashboardCard>
        <Title>Dashboard</Title>
        {/* Add your dashboard content here */}
        <p>Welcome to the Dashboard!</p>
      </DashboardCard>
    </DashboardContainer>
  );
};

export default Dashboard;
