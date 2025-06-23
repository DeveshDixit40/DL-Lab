import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Button, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PublicationManager from '../components/admin/PublicationManager';
import ProjectManager from '../components/admin/ProjectManager';
import InternshipManager from '../components/admin/InternshipManager';
import CourseManager from '../components/admin/CourseManager';
import GalleryManager from '../components/admin/GalleryManager';
import TeamManager from '../components/admin/TeamManager';
import ProfileManager from '../components/admin/ProfileManager';

const AdminDashboard = () => {
  const [adminInfo, setAdminInfo] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const info = localStorage.getItem('adminInfo');
    if (!info) {
      navigate('/login');
    } else {
      setAdminInfo(JSON.parse(info));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/login');
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const TabPanel = ({ children, value, index }) => {
    return (
      <Box role="tabpanel" hidden={value !== index} sx={{ py: 3 }}>
        {value === index && children}
      </Box>
    );
  };

  if (!adminInfo) return null;

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1">
              Admin Dashboard
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
          
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Welcome, {adminInfo.username}!
          </Typography>          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={currentTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
              <Tab label="Publications" />
              <Tab label="Projects" />
              <Tab label="Internships" />
              <Tab label="Courses" />
              <Tab label="Gallery" />
              <Tab label="Team" />
              <Tab label="Account Settings" />
            </Tabs>
          </Box>

          <TabPanel value={currentTab} index={0}>
            <PublicationManager />
          </TabPanel>
          <TabPanel value={currentTab} index={1}>
            <ProjectManager />
          </TabPanel>
          <TabPanel value={currentTab} index={2}>
            <InternshipManager />
          </TabPanel>
          <TabPanel value={currentTab} index={3}>
            <CourseManager />
          </TabPanel>
          <TabPanel value={currentTab} index={4}>
            <GalleryManager />
          </TabPanel>
          <TabPanel value={currentTab} index={5}>
            <TeamManager />
          </TabPanel>
          <TabPanel value={currentTab} index={6}>
            <ProfileManager />
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminDashboard;