import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Container,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Typography,
} from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const App = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: '',
    topic: '',
    sector: '',
    region: '',
    pest: '',
    source: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredData = data.filter(item => {
    return (
      (filters.endYear === '' || item.end_year === filters.endYear) &&
      (filters.topic === '' || item.topic === filters.topic) &&
      (filters.sector === '' || item.sector === filters.sector) &&
      (filters.region === '' || item.region === filters.region) &&
      (filters.pest === '' || item.pestle === filters.pest) &&
      (filters.source === '' || item.source === filters.source)
    );
  });

  const barData = {
    labels: filteredData.map(item => item.country),
    datasets: [
      {
        label: 'Intensity',
        data: filteredData.map(item => item.intensity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const lineData = {
    labels: filteredData.map(item => item.added),
    datasets: [
      {
        label: 'Likelihood',
        data: filteredData.map(item => item.likelihood),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const pieData = {
    labels: filteredData.map(item => item.topic),
    datasets: [
      {
        label: 'Relevance',
        data: filteredData.map(item => item.relevance),
        backgroundColor: filteredData.map(
          () => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`
        ),
      },
    ],
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Data Visualization Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="End Year"
                  name="endYear"
                  value={filters.endYear}
                  onChange={handleFilterChange}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Topic"
                  name="topic"
                  value={filters.topic}
                  onChange={handleFilterChange}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Sector"
                  name="sector"
                  value={filters.sector}
                  onChange={handleFilterChange}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Region"
                  name="region"
                  value={filters.region}
                  onChange={handleFilterChange}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="PEST"
                  name="pest"
                  value={filters.pest}
                  onChange={handleFilterChange}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Source"
                  name="source"
                  value={filters.source}
                  onChange={handleFilterChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Intensity by Country</Typography>
            <Bar data={barData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Likelihood Over Time</Typography>
            <Line data={lineData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Relevance by Topic</Typography>
            <Pie data={pieData} />
          </Paper>
        </Grid>

      </Grid>
    </Container>
  );
};

export default App;