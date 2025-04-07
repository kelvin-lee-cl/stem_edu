import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    TextField,
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
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    PlayArrow,
    Save,
    Code as CodeIcon,
    Build as BuildIcon,
    Science as ScienceIcon,
    Check as CheckIcon,
    RadioButtonUnchecked as UncheckedIcon,
    Sensors as SensorsIcon,
    Extension as ExtensionIcon,
    Battery90 as BatteryIcon,
    Wifi as WifiIcon,
    Input as InputIcon,
    Memory as MemoryIcon,
    Output as OutputIcon,
    Storage as DataIcon,
    ElectricBolt as ElectricBoltIcon,
    ToggleOn as ToggleOnIcon,
    DisplaySettings as DisplaySettingsIcon,
} from '@mui/icons-material';

interface CodeExample {
    id: string;
    title: string;
    code: string;
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

// Define all available parts
const arduinoParts: Part[] = [
    { id: '1', name: 'Arduino Uno', category: 'Board', icon: <MemoryIcon /> },
    { id: '2', name: 'LED', category: 'Output', icon: <ElectricBoltIcon /> },
    { id: '3', name: '220Ω Resistor', category: 'Passive', icon: <ElectricBoltIcon /> },
    { id: '4', name: 'Push Button', category: 'Input', icon: <ToggleOnIcon /> },
    { id: '5', name: 'DHT11 Sensor', category: 'Sensor', icon: <SensorsIcon /> },
    { id: '6', name: 'LCD Display', category: 'Display', icon: <DisplaySettingsIcon /> },
    { id: '7', name: 'Servo Motor', category: 'Motor', icon: <ElectricBoltIcon /> },
    { id: '8', name: '10kΩ Potentiometer', category: 'Input', icon: <ToggleOnIcon /> },
    { id: '9', name: 'Breadboard', category: 'Board', icon: <MemoryIcon /> },
    { id: '10', name: 'Jumper Wires', category: 'Connector', icon: <ElectricBoltIcon /> },
    { id: '11', name: 'Ultrasonic Sensor', category: 'Sensor', icon: <SensorsIcon /> },
    { id: '12', name: 'Buzzer', category: 'Output', icon: <ElectricBoltIcon /> },
    { id: '13', name: 'LDR (Light Sensor)', category: 'Sensor', icon: <SensorsIcon /> },
    { id: '14', name: 'Relay Module', category: 'Output', icon: <ElectricBoltIcon /> },
    { id: '15', name: 'Bluetooth Module', category: 'Connectivity', icon: <WifiIcon /> },
    { id: '16', name: '9V Battery', category: 'Power', icon: <BatteryIcon /> },
    { id: '17', name: 'SD Card Module', category: 'Data', icon: <DataIcon /> },
    { id: '18', name: 'Stepper Motor', category: 'Motor', icon: <ElectricBoltIcon /> },
    { id: '19', name: 'IR Receiver', category: 'Input', icon: <ToggleOnIcon /> },
    { id: '20', name: 'RGB LED', category: 'Output', icon: <ElectricBoltIcon /> },
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
    '2': {
        id: '2',
        title: 'LED Blinking with Arduino',
        description: 'Create your first Arduino project by programming an LED to blink.',
        parts: ['1', '2', '3', '9', '10'],
        components: ['1', '3', '5'],
        steps: [
            {
                id: '1',
                title: 'Connect the LED',
                description: 'Connect the LED to digital pin 13 with a 220Ω resistor in series',
            },
            {
                id: '2',
                title: 'Upload the Code',
                description: 'Upload the following code to make the LED blink:',
                code: `void setup() {
    pinMode(13, OUTPUT);
}

void loop() {
    digitalWrite(13, HIGH);
    delay(1000);
    digitalWrite(13, LOW);
    delay(1000);
}`,
            },
        ],
    },
    '4': {
        id: '4',
        title: 'Servo Motor Control',
        description: 'Learn how to control servo motors with Arduino for robotics projects.',
        parts: ['1', '7', '9', '10'],
        components: ['1', '3', '5'],
        steps: [
            {
                id: '1',
                title: 'Connect the Servo',
                description: 'Connect the servo motor to digital pin 9',
            },
            {
                id: '2',
                title: 'Upload the Code',
                description: 'Upload the following code to control the servo:',
                code: `#include <Servo.h>

Servo myservo;
int pos = 0;

void setup() {
    myservo.attach(9);
}

void loop() {
    for (pos = 0; pos <= 180; pos += 1) {
        myservo.write(pos);
        delay(15);
    }
    for (pos = 180; pos >= 0; pos -= 1) {
        myservo.write(pos);
        delay(15);
    }
}`,
            },
        ],
    },
    '6': {
        id: '6',
        title: 'IoT Weather Station',
        description: 'Create a weather station that uploads data to the cloud using Arduino and sensors.',
        parts: ['1', '5', '9', '10'],
        components: ['1', '3', '6'],
        steps: [
            {
                id: '1',
                title: 'Connect the Components',
                description: 'Connect the DHT11 sensor and LCD display using I2C',
            },
            {
                id: '2',
                title: 'Install Libraries',
                description: 'Install DHT and LiquidCrystal_I2C libraries',
            },
            {
                id: '3',
                title: 'Upload the Code',
                description: 'Upload the following code to display temperature:',
                code: `#include <DHT.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
    lcd.init();
    dht.begin();
}

void loop() {
    float temp = dht.readTemperature();
    
    lcd.setCursor(0, 0);
    lcd.print("Temperature:");
    lcd.setCursor(0, 1);
    lcd.print(temp);
    lcd.print(" C");
    
    delay(1000);
}`,
            },
        ],
    },
    '8': {
        id: '8',
        title: 'Arduino Music Player',
        description: 'Build a simple music player using Arduino and a buzzer.',
        parts: ['1', '9', '10'],
        components: ['1', '3', '5'],
        steps: [
            {
                id: '1',
                title: 'Connect the Buzzer',
                description: 'Connect the buzzer to digital pin 8',
            },
            {
                id: '2',
                title: 'Upload the Code',
                description: 'Upload the following code to play a simple melody:',
                code: `const int buzzerPin = 8;

void setup() {
    pinMode(buzzerPin, OUTPUT);
}

void loop() {
    tone(buzzerPin, 262); // C4
    delay(500);
    tone(buzzerPin, 294); // D4
    delay(500);
    tone(buzzerPin, 330); // E4
    delay(500);
    tone(buzzerPin, 349); // F4
    delay(500);
    noTone(buzzerPin);
    delay(1000);
}`,
            },
        ],
    },
    '10': {
        id: '10',
        title: 'Arduino Traffic Light',
        description: 'Simulate a traffic light system using multiple LEDs and Arduino.',
        parts: ['1', '2', '2', '2', '3', '3', '3', '9', '10'],
        components: ['1', '3', '5'],
        steps: [
            {
                id: '1',
                title: 'Connect the LEDs',
                description: 'Connect three LEDs (red, yellow, green) to digital pins 2, 3, and 4 respectively',
            },
            {
                id: '2',
                title: 'Upload the Code',
                description: 'Upload the following code to create a traffic light sequence:',
                code: `const int redPin = 2;
const int yellowPin = 3;
const int greenPin = 4;

void setup() {
    pinMode(redPin, OUTPUT);
    pinMode(yellowPin, OUTPUT);
    pinMode(greenPin, OUTPUT);
}

void loop() {
    // Red light
    digitalWrite(redPin, HIGH);
    digitalWrite(yellowPin, LOW);
    digitalWrite(greenPin, LOW);
    delay(5000);
    
    // Green light
    digitalWrite(redPin, LOW);
    digitalWrite(yellowPin, LOW);
    digitalWrite(greenPin, HIGH);
    delay(5000);
    
    // Yellow light
    digitalWrite(redPin, LOW);
    digitalWrite(yellowPin, HIGH);
    digitalWrite(greenPin, LOW);
    delay(2000);
}`,
            },
        ],
    },
    '12': {
        id: '12',
        title: 'Arduino LCD Display',
        description: 'Learn to use an LCD display with Arduino to show text and graphics.',
        parts: ['1', '6', '9', '10'],
        components: ['1', '3', '6'],
        steps: [
            {
                id: '1',
                title: 'Connect the LCD',
                description: 'Connect the LCD display using I2C interface',
            },
            {
                id: '2',
                title: 'Upload the Code',
                description: 'Upload the following code to display text on the LCD:',
                code: `#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
    lcd.init();
    lcd.backlight();
}

void loop() {
    lcd.setCursor(0, 0);
    lcd.print("Hello, Arduino!");
    lcd.setCursor(0, 1);
    lcd.print("LCD Display");
    delay(1000);
}`,
            },
        ],
    },
    '14': {
        id: '14',
        title: 'Arduino Ultrasonic Distance Sensor',
        description: 'Measure distance using an ultrasonic sensor with Arduino.',
        parts: ['1', '9', '10'],
        components: ['1', '3'],
        steps: [
            {
                id: '1',
                title: 'Connect the Sensor',
                description: 'Connect the ultrasonic sensor to digital pins 2 and 3',
            },
            {
                id: '2',
                title: 'Upload the Code',
                description: 'Upload the following code to measure distance:',
                code: `const int trigPin = 2;
const int echoPin = 3;

void setup() {
    Serial.begin(9600);
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);
}

void loop() {
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
    
    long duration = pulseIn(echoPin, HIGH);
    float distance = duration * 0.034 / 2;
    
    Serial.print("Distance: ");
    Serial.print(distance);
    Serial.println(" cm");
    
    delay(500);
}`,
            },
        ],
    },
    '16': {
        id: '16',
        title: 'Arduino Button Counter',
        description: 'Build a counter that increments when a button is pressed.',
        parts: ['1', '4', '3', '9', '10'],
        components: ['1', '3'],
        steps: [
            {
                id: '1',
                title: 'Connect the Button',
                description: 'Connect the button to digital pin 2 and ground',
            },
            {
                id: '2',
                title: 'Upload the Code',
                description: 'Upload the following code to create a button counter:',
                code: `int buttonPin = 2;
int counter = 0;
int lastButtonState = HIGH;

void setup() {
    pinMode(buttonPin, INPUT_PULLUP);
    Serial.begin(9600);
}

void loop() {
    int buttonState = digitalRead(buttonPin);
    
    if (buttonState == LOW && lastButtonState == HIGH) {
        counter++;
        Serial.print("Count: ");
        Serial.println(counter);
        delay(250);
    }
    
    lastButtonState = buttonState;
}`,
            },
        ],
    },
};

const codeExamples: CodeExample[] = [
    {
        id: '1',
        title: 'Blink LED',
        code: `// Blink the LED on the Micro:bit
basic.forever(function () {
    led.plot(2, 2)
    basic.pause(500)
    led.unplot(2, 2)
    basic.pause(500)
})`,
    },
    {
        id: '2',
        title: 'Temperature Sensor',
        code: `// Read temperature from the Micro:bit
basic.forever(function () {
    let temp = input.temperature()
    basic.showNumber(temp)
    basic.pause(1000)
})`,
    },
    {
        id: '3',
        title: 'Accelerometer',
        code: `// Detect shake using the accelerometer
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Heart)
    basic.pause(1000)
    basic.clearScreen()
})`,
    },
];

const ArduinoPlayground: React.FC = () => {
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
        prototyping: [],
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
        const part = arduinoParts.find(p => p.id === partId);

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
        const requiredParts = arduinoParts.filter(part =>
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
                Arduino Playground
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
                                {arduinoParts.map((part) => (
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

export default ArduinoPlayground; 