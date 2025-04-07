import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@mui/material';
import {
    School as SchoolIcon,
    Code as CodeIcon,
    Build as BuildIcon,
    Person as PersonIcon,
    Lightbulb as LightbulbIcon,
    EmojiObjects as EmojiObjectsIcon,
    Psychology as PsychologyIcon,
    Group as GroupIcon,
} from '@mui/icons-material';

const About: React.FC = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    About STEM Learning Platform
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" paragraph>
                    Empowering students to learn STEM concepts through interactive programming and hands-on projects
                </Typography>

                <Paper sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Our Mission
                    </Typography>
                    <Typography paragraph>
                        The STEM Learning Platform is designed to make STEM education accessible, engaging, and practical for students of all ages.
                        We believe in learning by doing, and our platform provides the tools and resources needed to explore programming,
                        electronics, and robotics in an interactive environment.
                    </Typography>
                </Paper>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3, height: '100%' }}>
                            <Typography variant="h5" gutterBottom>
                                Key Features
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <SchoolIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Interactive Lessons"
                                        secondary="Step-by-step tutorials with hands-on exercises"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <CodeIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Micro:bit Programming"
                                        secondary="Learn programming with the Micro:bit microcontroller"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <BuildIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Arduino Projects"
                                        secondary="Build and program Arduino-based projects"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <PersonIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Personalized Learning"
                                        secondary="Track your progress and save your projects"
                                    />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3, height: '100%' }}>
                            <Typography variant="h5" gutterBottom>
                                Learning Approach
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <LightbulbIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Project-Based Learning"
                                        secondary="Learn through real-world projects and applications"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <EmojiObjectsIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Problem Solving"
                                        secondary="Develop critical thinking and problem-solving skills"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <PsychologyIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Conceptual Understanding"
                                        secondary="Build a strong foundation in STEM concepts"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <GroupIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Collaborative Learning"
                                        secondary="Share projects and learn from others"
                                    />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                <Paper sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        Getting Started
                    </Typography>
                    <Typography paragraph>
                        To get started with the STEM Learning Platform:
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary="1. Explore the Lessons"
                                secondary="Browse through our collection of interactive lessons"
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="2. Choose a Project"
                                secondary="Select a project that interests you and matches your skill level"
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="3. Follow the Tutorial"
                                secondary="Work through the step-by-step instructions"
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="4. Experiment and Learn"
                                secondary="Modify the projects to explore new ideas and concepts"
                            />
                        </ListItem>
                    </List>
                </Paper>
            </Box>
        </Container>
    );
};

export default About; 