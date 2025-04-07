import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
} from '@mui/material';
import {
    School as SchoolIcon,
    Code as CodeIcon,
    Build as BuildIcon,
    Person as PersonIcon,
} from '@mui/icons-material';

const features = [
    {
        title: 'Interactive Lessons',
        description: 'Learn STEM concepts through hands-on, interactive lessons designed for all skill levels.',
        icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    },
    {
        title: 'Micro:bit Programming',
        description: 'Write and test code for the Micro:bit microcontroller in our online simulator.',
        icon: <CodeIcon sx={{ fontSize: 40 }} />,
    },
    {
        title: 'Arduino Projects',
        description: 'Design and simulate Arduino circuits and programs in our virtual playground.',
        icon: <BuildIcon sx={{ fontSize: 40 }} />,
    },
    {
        title: 'Personal Profile',
        description: 'Track your progress, save your projects, and earn achievements as you learn.',
        icon: <PersonIcon sx={{ fontSize: 40 }} />,
    },
];

const Home: React.FC = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to STEM Learning Platform
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" paragraph>
                    Learn STEM concepts through interactive programming and hands-on projects
                </Typography>

                <Grid container spacing={4} sx={{ mt: 4 }}>
                    {features.map((feature) => (
                        <Grid item xs={12} sm={6} md={3} key={feature.title}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                        {feature.icon}
                                    </Box>
                                    <Typography variant="h6" component="h2" gutterBottom align="center">
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Home; 