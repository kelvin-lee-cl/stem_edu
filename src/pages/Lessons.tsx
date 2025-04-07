import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
    Chip,
    LinearProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    InputAdornment,
    CardActionArea,
} from '@mui/material';
import {
    School as SchoolIcon,
    Code as CodeIcon,
    Build as BuildIcon,
    Science as ScienceIcon,
    Search as SearchIcon,
} from '@mui/icons-material';

interface Lesson {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    progress: number;
    icon: React.ReactNode;
    tags: string[];
}

const sampleLessons: Lesson[] = [
    {
        id: '1',
        title: 'Introduction to Micro:bit',
        description: 'Learn the basics of the Micro:bit microcontroller and its programming environment.',
        category: 'Micro:bit',
        difficulty: 'Beginner',
        progress: 0,
        icon: <CodeIcon sx={{ fontSize: 40 }} />,
        tags: ['basics', 'introduction', 'microcontroller'],
    },
    {
        id: '2',
        title: 'LED Blinking with Arduino',
        description: 'Create your first Arduino project by programming an LED to blink.',
        category: 'Arduino',
        difficulty: 'Beginner',
        progress: 0,
        icon: <BuildIcon sx={{ fontSize: 40 }} />,
        tags: ['led', 'output', 'basics'],
    },
    {
        id: '3',
        title: 'Temperature Sensor Project',
        description: 'Build a temperature monitoring system using a Micro:bit and temperature sensor.',
        category: 'Micro:bit',
        difficulty: 'Intermediate',
        progress: 0,
        icon: <ScienceIcon sx={{ fontSize: 40 }} />,
        tags: ['sensors', 'temperature', 'monitoring'],
    },
    {
        id: '4',
        title: 'Servo Motor Control',
        description: 'Learn how to control servo motors with Arduino for robotics projects.',
        category: 'Arduino',
        difficulty: 'Intermediate',
        progress: 0,
        icon: <BuildIcon sx={{ fontSize: 40 }} />,
        tags: ['motors', 'robotics', 'control'],
    },
    {
        id: '5',
        title: 'Wireless Communication',
        description: 'Implement wireless communication between two Micro:bit devices.',
        category: 'Micro:bit',
        difficulty: 'Advanced',
        progress: 0,
        icon: <CodeIcon sx={{ fontSize: 40 }} />,
        tags: ['wireless', 'communication', 'networking'],
    },
    {
        id: '6',
        title: 'IoT Weather Station',
        description: 'Create a weather station that uploads data to the cloud using Arduino and sensors.',
        category: 'Arduino',
        difficulty: 'Advanced',
        progress: 0,
        icon: <ScienceIcon sx={{ fontSize: 40 }} />,
        tags: ['iot', 'weather', 'cloud', 'sensors'],
    },
    {
        id: '7',
        title: 'Digital Dice with Micro:bit',
        description: 'Create a digital dice that displays random numbers when shaken.',
        category: 'Micro:bit',
        difficulty: 'Beginner',
        progress: 0,
        icon: <CodeIcon sx={{ fontSize: 40 }} />,
        tags: ['games', 'random', 'accelerometer'],
    },
    {
        id: '8',
        title: 'Arduino Music Player',
        description: 'Build a simple music player using Arduino and a buzzer.',
        category: 'Arduino',
        difficulty: 'Intermediate',
        progress: 0,
        icon: <BuildIcon sx={{ fontSize: 40 }} />,
        tags: ['audio', 'music', 'buzzer'],
    },
    {
        id: '9',
        title: 'Micro:bit Compass',
        description: 'Create a digital compass using the Micro:bit magnetometer sensor.',
        category: 'Micro:bit',
        difficulty: 'Intermediate',
        progress: 0,
        icon: <ScienceIcon sx={{ fontSize: 40 }} />,
        tags: ['sensors', 'magnetometer', 'navigation'],
    },
    {
        id: '10',
        title: 'Arduino Traffic Light',
        description: 'Simulate a traffic light system using multiple LEDs and Arduino.',
        category: 'Arduino',
        difficulty: 'Beginner',
        progress: 0,
        icon: <BuildIcon sx={{ fontSize: 40 }} />,
        tags: ['led', 'traffic', 'simulation'],
    },
    {
        id: '11',
        title: 'Micro:bit Step Counter',
        description: 'Build a step counter using the Micro:bit accelerometer.',
        category: 'Micro:bit',
        difficulty: 'Intermediate',
        progress: 0,
        icon: <ScienceIcon sx={{ fontSize: 40 }} />,
        tags: ['fitness', 'accelerometer', 'counting'],
    },
    {
        id: '12',
        title: 'Arduino LCD Display',
        description: 'Learn to use an LCD display with Arduino to show text and graphics.',
        category: 'Arduino',
        difficulty: 'Intermediate',
        progress: 0,
        icon: <BuildIcon sx={{ fontSize: 40 }} />,
        tags: ['display', 'lcd', 'output'],
    },
    {
        id: '13',
        title: 'Micro:bit Radio Chat',
        description: 'Create a simple chat application using Micro:bit radio communication.',
        category: 'Micro:bit',
        difficulty: 'Advanced',
        progress: 0,
        icon: <CodeIcon sx={{ fontSize: 40 }} />,
        tags: ['communication', 'radio', 'chat'],
    },
    {
        id: '14',
        title: 'Arduino Ultrasonic Distance Sensor',
        description: 'Measure distance using an ultrasonic sensor with Arduino.',
        category: 'Arduino',
        difficulty: 'Intermediate',
        progress: 0,
        icon: <ScienceIcon sx={{ fontSize: 40 }} />,
        tags: ['sensors', 'distance', 'measurement'],
    },
    {
        id: '15',
        title: 'Micro:bit Light Level Monitor',
        description: 'Create a light level monitoring system using the Micro:bit light sensor.',
        category: 'Micro:bit',
        difficulty: 'Beginner',
        progress: 0,
        icon: <ScienceIcon sx={{ fontSize: 40 }} />,
        tags: ['sensors', 'light', 'monitoring'],
    },
    {
        id: '16',
        title: 'Arduino Button Counter',
        description: 'Build a counter that increments when a button is pressed.',
        category: 'Arduino',
        difficulty: 'Beginner',
        progress: 0,
        icon: <BuildIcon sx={{ fontSize: 40 }} />,
        tags: ['input', 'buttons', 'counting'],
    },
];

const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case 'Beginner':
            return 'success';
        case 'Intermediate':
            return 'warning';
        case 'Advanced':
            return 'error';
        default:
            return 'default';
    }
};

type SortOption = 'title' | 'difficulty' | 'category' | 'progress';
type FilterOption = 'all' | 'Micro:bit' | 'Arduino';

const Lessons: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortBy, setSortBy] = useState<SortOption>('title');
    const [filterBy, setFilterBy] = useState<FilterOption>('all');

    const handleSortChange = (event: SelectChangeEvent<SortOption>) => {
        setSortBy(event.target.value as SortOption);
    };

    const handleFilterChange = (event: SelectChangeEvent<FilterOption>) => {
        setFilterBy(event.target.value as FilterOption);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleLessonClick = (lesson: Lesson) => {
        // Navigate to the appropriate playground with the lesson ID
        const playgroundPath = lesson.category === 'Micro:bit'
            ? '/playground/microbit'
            : '/playground/arduino';
        navigate(playgroundPath, { state: { lessonId: lesson.id } });
    };

    const filteredAndSortedLessons = useMemo(() => {
        // Filter lessons
        let filtered = sampleLessons;

        // Apply category filter
        if (filterBy !== 'all') {
            filtered = filtered.filter(lesson => lesson.category === filterBy);
        }

        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(lesson =>
                lesson.title.toLowerCase().includes(term) ||
                lesson.description.toLowerCase().includes(term) ||
                lesson.tags.some(tag => tag.toLowerCase().includes(term))
            );
        }

        // Sort lessons
        return [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'difficulty':
                    const difficultyOrder = { 'Beginner': 0, 'Intermediate': 1, 'Advanced': 2 };
                    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
                case 'category':
                    return a.category.localeCompare(b.category);
                case 'progress':
                    return b.progress - a.progress;
                default:
                    return 0;
            }
        });
    }, [searchTerm, sortBy, filterBy]);

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    STEM Lessons
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" paragraph>
                    Explore our interactive lessons to learn STEM concepts through hands-on projects.
                </Typography>

                <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search lessons..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        sx={{ flexGrow: 1 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel id="filter-label">Filter By</InputLabel>
                        <Select
                            labelId="filter-label"
                            value={filterBy}
                            label="Filter By"
                            onChange={handleFilterChange}
                        >
                            <MenuItem value="all">All Categories</MenuItem>
                            <MenuItem value="Micro:bit">Micro:bit</MenuItem>
                            <MenuItem value="Arduino">Arduino</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel id="sort-label">Sort By</InputLabel>
                        <Select
                            labelId="sort-label"
                            value={sortBy}
                            label="Sort By"
                            onChange={handleSortChange}
                        >
                            <MenuItem value="title">Title</MenuItem>
                            <MenuItem value="difficulty">Difficulty</MenuItem>
                            <MenuItem value="category">Category</MenuItem>
                            <MenuItem value="progress">Progress</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Grid container spacing={4}>
                    {filteredAndSortedLessons.map((lesson) => (
                        <Grid item xs={12} sm={6} md={4} key={lesson.id}>
                            <Card sx={{ height: '100%' }}>
                                <CardActionArea onClick={() => handleLessonClick(lesson)}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Box sx={{ color: 'primary.main', mr: 2 }}>
                                                {lesson.icon}
                                            </Box>
                                            <Typography variant="h6" component="h2">
                                                {lesson.title}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" paragraph>
                                            {lesson.description}
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                            <Chip label={lesson.category} size="small" />
                                            <Chip
                                                label={lesson.difficulty}
                                                size="small"
                                                color={getDifficultyColor(lesson.difficulty) as any}
                                            />
                                            {lesson.tags.slice(0, 2).map((tag) => (
                                                <Chip key={tag} label={tag} size="small" variant="outlined" />
                                            ))}
                                        </Box>
                                        <Box sx={{ width: '100%', mt: 2 }}>
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                Progress: {lesson.progress}%
                                            </Typography>
                                            <LinearProgress
                                                variant="determinate"
                                                value={lesson.progress}
                                                sx={{ height: 8, borderRadius: 4 }}
                                            />
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Lessons; 