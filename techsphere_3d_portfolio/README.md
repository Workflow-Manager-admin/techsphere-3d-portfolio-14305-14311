# TechSphere 3D Portfolio

An immersive and interactive 3D portfolio website for an IT company that showcases technological expertise and innovative solutions using React and Three.js.

## Features

- **Interactive 3D Environment**: Fully interactive 3D scene using Three.js and React Three Fiber
- **Responsive Design**: Adapts to different screen sizes and devices
- **Performance Optimized**: Automatic quality adjustment based on device capabilities
- **Animated UI**: Smooth transitions and animations for a modern experience
- **Interactive Tech Elements**: Interactive 3D elements representing different technology domains

## Technologies Used

- React 18
- Three.js
- React Three Fiber
- React Three Drei
- React Spring for animations

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm 6.x or higher

### Installation

1. Clone the repository:
```
git clone <repository-url>
cd techsphere-3d-portfolio
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Project Structure

- `src/components/MainContainer.js`: Main container component that integrates all parts of the portfolio
- `src/components/canvas/TechSphereCanvas.js`: Three.js canvas setup and scene configuration
- `src/components/models/`: 3D models and elements
  - `TechSphere.js`: Central tech sphere component
  - `FloatingPlatform.js`: Platform beneath the tech sphere
  - `TechItems.js`: Interactive tech items that orbit around the sphere
- `src/utils/`: Utility functions
  - `animations.js`: Animation helper functions
  - `interactions.js`: User interaction helpers

## Usage

The TechSphere 3D portfolio is designed to showcase a tech company's expertise and projects. It includes:

- A central 3D tech sphere representing the company's technological core
- Orbiting tech items representing different technology domains (AI, Cloud, IoT, etc.)
- Scroll-based camera animations that guide the user through different sections
- Interactive elements that respond to user hover and click actions
- Information sections for company overview, projects, and contact

## Customization

### Modifying Colors

The main colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --kavia-orange: #E87A41;
  --kavia-dark: #1A1A1A;
  --text-color: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
  --gradient-dark: linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%);
  --shadow-glow: 0 0 20px rgba(232, 122, 65, 0.3);
}
```

### Adding Tech Items

To add or modify the tech items that orbit around the central sphere, edit the `techItems` array in `src/components/models/TechItems.js`:

```jsx
const techItems = [
  { position: [radius, 0, 0], rotationSpeed: 0.5, icon: 'box', label: 'Cloud Computing' },
  // Add more items here
];
```

## Building for Production

To create a production-optimized build:

```
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Performance Tips

- The 3D scene automatically adjusts quality based on the device's capabilities
- For better performance on mobile devices, fewer animations are used
- The scene uses proper LOD (Level of Detail) for different viewing distances

## License

[MIT License](LICENSE)
