import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Typography,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@mui/material';
import {
    Memory as MemoryIcon,
    ElectricBolt as ElectricBoltIcon,
    Sensors as SensorsIcon,
    ToggleOn as ToggleOnIcon,
    DisplaySettings as DisplaySettingsIcon,
    Code as CodeIcon,
    Build as BuildIcon,
    Science as ScienceIcon,
    Input as InputIcon,
    Output as OutputIcon,
    Extension as ExtensionIcon,
    Wifi as WifiIcon,
    Battery90 as BatteryIcon,
    Storage as DataIcon,
} from '@mui/icons-material';

interface Part {
    id: string;
    name: string;
    category: string;
    icon: React.ReactNode;
}

interface Component {
    id: string;
    name: string;
    category: string;
    icon: React.ReactNode;
}

interface LessonStep {
    id: string;
    title: string;
    description: string;
    code?: string;
}

interface Lesson {
    id: string;
    title: string;
    description: string;
    parts: string[];
    components: string[];
    steps: LessonStep[];
}

// Define all available Micro:bit parts
const microbitParts: Part[] = [
    { id: '1', name: 'Micro:bit V2', category: 'Board', icon: <MemoryIcon /> },
    { id: '2', name: 'LED Matrix', category: 'Output', icon: <DisplaySettingsIcon /> },
    { id: '3', name: 'Push Button A', category: 'Input', icon: <ToggleOnIcon /> },
    { id: '4', name: 'Push Button B', category: 'Input', icon: <ToggleOnIcon /> },
    { id: '5', name: 'Temperature Sensor', category: 'Sensor', icon: <SensorsIcon /> },
    { id: '6', name: 'Accelerometer', category: 'Sensor', icon: <SensorsIcon /> },
    { id: '7', name: 'Compass', category: 'Sensor', icon: <SensorsIcon /> },
    { id: '8', name: 'Light Sensor', category: 'Sensor', icon: <SensorsIcon /> },
    { id: '9', name: 'Speaker', category: 'Output', icon: <ElectricBoltIcon /> },
    { id: '10', name: 'Microphone', category: 'Input', icon: <SensorsIcon /> },
    { id: '11', name: 'Touch Pins', category: 'Input', icon: <ToggleOnIcon /> },
    { id: '12', name: 'Edge Connector', category: 'Extension', icon: <ExtensionIcon /> },
    { id: '13', name: 'USB Connector', category: 'Connectivity', icon: <WifiIcon /> },
    { id: '14', name: 'Bluetooth', category: 'Connectivity', icon: <WifiIcon /> },
    { id: '15', name: 'Battery Connector', category: 'Power', icon: <BatteryIcon /> },
    { id: '16', name: 'Reset Button', category: 'Input', icon: <ToggleOnIcon /> },
    { id: '17', name: 'System LED', category: 'Output', icon: <ElectricBoltIcon /> },
    { id: '18', name: 'Microphone LED', category: 'Output', icon: <ElectricBoltIcon /> },
    { id: '19', name: 'Radio', category: 'Connectivity', icon: <WifiIcon /> },
    { id: '20', name: 'Motion Sensor', category: 'Sensor', icon: <SensorsIcon /> },
];

// Define component categories
const componentCategories = [
    { id: 'input', name: 'Input', icon: <InputIcon />, description: 'Sensors and input devices' },
    { id: 'process', name: 'Process', icon: <MemoryIcon />, description: 'Microcontroller and processing' },
    { id: 'output', name: 'Output', icon: <OutputIcon />, description: 'LEDs, displays, and actuators' },
    { id: 'extension', name: 'Extension Board', icon: <ExtensionIcon />, description: 'Additional boards and modules' },
    { id: 'connectivity', name: 'Connectivity', icon: <WifiIcon />, description: 'Communication modules' },
    { id: 'power', name: 'Power', icon: <BatteryIcon />, description: 'Power supply and management' },
    { id: 'data', name: 'Data', icon: <DataIcon />, description: 'Data storage and logging' },
    { id: 'mechanical', name: 'Mechanical Structure', icon: <BuildIcon />, description: 'Frames, mounts, and structural components' },
    { id: 'electrical', name: 'Electrical Components', icon: <ElectricBoltIcon />, description: 'Resistors, capacitors, and other prototyping parts such as breadboard, connectors, etc.' },
];

// Define lessons with their required parts and steps
const lessons: Record<string, Lesson> = {
    '1': {
        id: '1',
        title: 'LED Blinking with Micro:bit',
        description: 'Create your first Micro:bit project by programming the LED matrix to display patterns.',
        parts: ['1', '2'],
        components: ['1', '2', '3'],
        steps: [
            {
                id: '1',
                title: 'Connect your Micro:bit',
                description: 'Connect your Micro:bit to your computer using the USB cable',
            },
            {
                id: '2',
                title: 'Upload the Code',
                description: 'Upload the following code to make the LED matrix display a heart:',
                code: `basic.showIcon(IconNames.Heart)
basic.pause(1000)
basic.clearScreen()
basic.pause(1000)`,
            },
        ],
    },
    '3': {
        id: '3',
        title: 'Temperature Sensor Project',
        description: 'Build a temperature monitoring system using the Micro:bit\'s built-in temperature sensor.',
        parts: ['1', '2', '5'],
        components: ['1', '2', '3'],
        steps: [
            {
                id: '1',
                title: 'Connect your Micro:bit',
                description: 'Connect your Micro:bit to your computer using the USB cable',
            },
            {
                id: '2',
                title: 'Upload the Code',
                description: 'Upload the following code to read and display the temperature:',
                code: `basic.forever(function () {
    let temp = input.temperature()
    basic.showNumber(temp)
    basic.pause(1000)
})`,
            },
        ],
    },
    '5': {
        id: '5',
        title: 'Accelerometer Game',
        description: 'Create a simple game using the Micro:bit\'s accelerometer to detect tilting.',
        parts: ['1', '2', '6'],
        components: ['1', '2', '3'],
        steps: [
            {
                id: '1',
                title: 'Connect your Micro:bit',
                description: 'Connect your Micro:bit to your computer using the USB cable',
            },
            {
                id: '2',
                title: 'Upload the Code',
                description: 'Upload the following code to create a simple game:',
                code: `let score = 0
let gameRunning = false

input.onButtonPressed(Button.A, function () {
    gameRunning = true
    score = 0
    basic.showString("GO!")
})

input.onGesture(Gesture.Shake, function () {
    if (gameRunning) {
        score += 1
        basic.showNumber(score)
    }
})

input.onButtonPressed(Button.B, function () {
    gameRunning = false
    basic.showString("Score:")
    basic.showNumber(score)
})`,
            },
        ],
    },
    '7': {
        id: '7',
        title: 'Compass Navigation',
        description: 'Use the Micro:bit\'s compass to create a navigation tool.',
        parts: ['1', '2', '7'],
        components: ['1', '2', '3'],
        steps: [
            {
                id: '1',
                title: 'Connect your Micro:bit',
                description: 'Connect your Micro:bit to your computer using the USB cable',
            },
            {
                id: '2',
                title: 'Calibrate the Compass',
                description: 'Before using the compass, you need to calibrate it by tilting the Micro:bit in a figure-8 pattern',
            },
            {
                id: '3',
                title: 'Upload the Code',
                description: 'Upload the following code to create a compass:',
                code: `basic.forever(function () {
    let heading = input.compassHeading()
    if (heading < 45) {
        basic.showArrow(ArrowNames.North)
    } else if (heading < 135) {
        basic.showArrow(ArrowNames.East)
    } else if (heading < 225) {
        basic.showArrow(ArrowNames.South)
    } else if (heading < 315) {
        basic.showArrow(ArrowNames.West)
    } else {
        basic.showArrow(ArrowNames.North)
    }
})`,
            },
        ],
    },
    '9': {
        id: '9',
        title: 'Music Player',
        description: 'Create a simple music player using the Micro:bit\'s speaker.',
        parts: ['1', '9'],
        components: ['1', '2', '3'],
        steps: [
            {
                id: '1',
                title: 'Connect your Micro:bit',
                description: 'Connect your Micro:bit to your computer using the USB cable',
            },
            {
                id: '2',
                title: 'Upload the Code',
                description: 'Upload the following code to play a simple melody:',
                code: `input.onButtonPressed(Button.A, function () {
    music.playTone(Note.C5, 500)
    music.playTone(Note.D5, 500)
    music.playTone(Note.E5, 500)
    music.playTone(Note.F5, 500)
    music.playTone(Note.G5, 500)
})`,
            },
        ],
    },
    '11': {
        id: '11',
        title: 'Touch Sensor Game',
        description: 'Create a game using the Micro:bit\'s touch pins.',
        parts: ['1', '2', '11'],
        components: ['1', '2', '3'],
        steps: [
            {
                id: '1',
                title: 'Connect your Micro:bit',
                description: 'Connect your Micro:bit to your computer using the USB cable',
            },
            {
                id: '2',
                title: 'Upload the Code',
                description: 'Upload the following code to create a touch sensor game:',
                code: `let count = 0

input.onPinPressed(TouchPin.P0, function () {
    count += 1
    basic.showNumber(count)
})

input.onButtonPressed(Button.B, function () {
    count = 0
    basic.showNumber(count)
})`,
            },
        ],
    },
    '13': {
        id: '13',
        title: 'USB Communication',
        description: 'Send data from your Micro:bit to a computer via USB.',
        parts: ['1', '13'],
        components: ['1', '2', '5'],
        steps: [
            {
                id: '1',
                title: 'Connect your Micro:bit',
                description: 'Connect your Micro:bit to your computer using the USB cable',
            },
            {
                id: '2',
                title: 'Upload the Code',
                description: 'Upload the following code to send data via USB:',
                code: `basic.forever(function () {
    let temp = input.temperature()
    serial.writeValue("temperature", temp)
    basic.pause(1000)
})`,
            },
        ],
    },
    '15': {
        id: '15',
        title: 'Battery Level Indicator',
        description: 'Create a battery level indicator for your Micro:bit.',
        parts: ['1', '2', '15'],
        components: ['1', '2', '6'],
        steps: [
            {
                id: '1',
                title: 'Connect your Micro:bit',
                description: 'Connect your Micro:bit to your computer using the USB cable',
            },
            {
                id: '2',
                title: 'Upload the Code',
                description: 'Upload the following code to display battery level:',
                code: `basic.forever(function () {
    let level = pins.analogReadPin(AnalogPin.P0)
    if (level > 750) {
        basic.showIcon(IconNames.Yes)
    } else if (level > 500) {
        basic.showIcon(IconNames.SmallHeart)
    } else {
        basic.showIcon(IconNames.No)
    }
    basic.pause(1000)
})`,
            },
        ],
    },
};

const MicrobitPlayground: React.FC = () => {
    const location = useLocation();
    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
    const [activeStep, setActiveStep] = useState(0);
    const [categorizedParts, setCategorizedParts] = useState<Record<string, Part[]>>({
        input: [],
        process: [],
        output: [],
        extension: [],
        connectivity: [],
        power: [],
        data: [],
        mechanical: [],
        electrical: [],
    });

    useEffect(() => {
        const lessonId = location.state?.lessonId;
        if (lessonId && lessons[lessonId]) {
            setActiveLesson(lessons[lessonId]);
        }
    }, [location]);

    const handleNext = () => {
        if (activeLesson && activeStep < activeLesson.steps.length - 1) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleDragStart = (e: React.DragEvent, part: Part) => {
        e.dataTransfer.setData('text/plain', part.id);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, categoryId: string) => {
        e.preventDefault();
        const partId = e.dataTransfer.getData('text/plain');
        const part = microbitParts.find(p => p.id === partId);

        if (part) {
            setCategorizedParts(prev => {
                // Remove the part from all categories first
                const newCategorizedParts = { ...prev };
                Object.keys(newCategorizedParts).forEach(category => {
                    newCategorizedParts[category] = newCategorizedParts[category].filter(p => p.id !== partId);
                });

                // Add the part to the target category
                newCategorizedParts[categoryId] = [...newCategorizedParts[categoryId], part];

                return newCategorizedParts;
            });
        }
    };

    const handleRemovePart = (categoryId: string, partId: string) => {
        setCategorizedParts(prev => {
            const newCategorizedParts = { ...prev };
            newCategorizedParts[categoryId] = newCategorizedParts[categoryId].filter(p => p.id !== partId);
            return newCategorizedParts;
        });
    };

    // If a lesson is selected, show the lesson view
    if (activeLesson) {
        const requiredParts = microbitParts.filter(part =>
            activeLesson.parts.includes(part.id)
        );

        return (
            <Container maxWidth="lg">
                <Typography variant="h4" gutterBottom>
                    {activeLesson.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" paragraph>
                    {activeLesson.description}
                </Typography>

                <Grid container spacing={3}>
                    {/* Required Parts List */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2, height: '100%' }}>
                            <Typography variant="h6" gutterBottom>
                                Required Parts
                            </Typography>
                            <List>
                                {requiredParts.map((part) => (
                                    <ListItem key={part.id}>
                                        <ListItemIcon>{part.icon}</ListItemIcon>
                                        <ListItemText primary={part.name} secondary={part.category} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>

                    {/* Step-by-Step Instructions */}
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Instructions
                            </Typography>
                            <Stepper activeStep={activeStep} orientation="vertical">
                                {activeLesson.steps.map((step) => (
                                    <Step key={step.id}>
                                        <StepLabel>{step.title}</StepLabel>
                                        <StepContent>
                                            <Typography>{step.description}</Typography>
                                            {step.code && (
                                                <Paper
                                                    sx={{
                                                        p: 2,
                                                        mt: 2,
                                                        bgcolor: 'grey.100',
                                                        fontFamily: 'monospace',
                                                        whiteSpace: 'pre-wrap'
                                                    }}
                                                >
                                                    {step.code}
                                                </Paper>
                                            )}
                                            <Box sx={{ mb: 2, mt: 2 }}>
                                                <div>
                                                    <Button
                                                        variant="contained"
                                                        onClick={handleNext}
                                                        sx={{ mt: 1, mr: 1 }}
                                                        disabled={activeStep === activeLesson.steps.length - 1}
                                                    >
                                                        {activeStep === activeLesson.steps.length - 1 ? 'Finish' : 'Continue'}
                                                    </Button>
                                                    <Button
                                                        disabled={activeStep === 0}
                                                        onClick={handleBack}
                                                        sx={{ mt: 1, mr: 1 }}
                                                    >
                                                        Back
                                                    </Button>
                                                </div>
                                            </Box>
                                        </StepContent>
                                    </Step>
                                ))}
                            </Stepper>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        );
    }

    // If no lesson is selected, show the empty playground with drag-and-drop interface
    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                Micro:bit Playground
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" paragraph>
                Drag and drop parts from the library to organize them into categories.
            </Typography>

            <Grid container spacing={3}>
                {/* Parts Library */}
                <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 2, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                            Parts Library
                        </Typography>
                        <Box sx={{
                            maxHeight: 'calc(100vh - 250px)',
                            overflowY: 'auto',
                            '&::-webkit-scrollbar': {
                                width: '8px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: '#f1f1f1',
                                borderRadius: '4px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: '#888',
                                borderRadius: '4px',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                background: '#555',
                            },
                        }}>
                            <List>
                                {microbitParts.map((part) => (
                                    <ListItem
                                        key={part.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, part)}
                                        sx={{
                                            cursor: 'grab',
                                            '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                                        }}
                                    >
                                        <ListItemIcon>{part.icon}</ListItemIcon>
                                        <ListItemText primary={part.name} secondary={part.category} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Paper>
                </Grid>

                {/* Component Categories */}
                <Grid item xs={12} md={9}>
                    <Grid container spacing={2} sx={{ height: '100%' }}>
                        {componentCategories.map((category) => (
                            <Grid item xs={12} sm={6} md={4} key={category.id}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        height: '100%',
                                        minHeight: 200,
                                        bgcolor: 'rgba(0, 0, 0, 0.02)',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, category.id)}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        {category.icon}
                                        <Typography variant="h6" sx={{ ml: 1 }}>
                                            {category.name}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        {category.description}
                                    </Typography>
                                    <Divider sx={{ my: 1 }} />
                                    <Box sx={{
                                        mt: 2,
                                        flexGrow: 1,
                                        overflowY: 'auto',
                                        '&::-webkit-scrollbar': {
                                            width: '6px',
                                        },
                                        '&::-webkit-scrollbar-track': {
                                            background: '#f1f1f1',
                                            borderRadius: '4px',
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            background: '#888',
                                            borderRadius: '4px',
                                        },
                                        '&::-webkit-scrollbar-thumb:hover': {
                                            background: '#555',
                                        },
                                    }}>
                                        {categorizedParts[category.id].map((part) => (
                                            <Box
                                                key={part.id}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    p: 1,
                                                    mb: 1,
                                                    bgcolor: 'background.paper',
                                                    borderRadius: 1,
                                                    boxShadow: 1
                                                }}
                                            >
                                                {part.icon}
                                                <Typography variant="body2" sx={{ ml: 1, flexGrow: 1 }}>
                                                    {part.name}
                                                </Typography>
                                                <Button
                                                    size="small"
                                                    onClick={() => handleRemovePart(category.id, part.id)}
                                                    sx={{ minWidth: 'auto', p: 0.5 }}
                                                >
                                                    ×
                                                </Button>
                                            </Box>
                                        ))}
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MicrobitPlayground; 