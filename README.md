# Spotify-Analyzer

## Overview
Spotify Analyzer is a JavaScript-based data processing and visualization tool that explores Spotify's top tracks of 2023. This project utilizes functional programming techniques, higher-order functions, and object-oriented design to analyze a dataset of popular songs. Additionally, it generates an SVG visualization of the most frequently appearing artists.

## Features
- **Higher-Order Functions**: Implements advanced JavaScript techniques like map, reduce, and filter to process song data.
- **CSV Parsing & Data Transformation**: Reads and converts a structured CSV file into JavaScript objects for analysis.
- **SVG Rendering**: Generates visual representations of top artists using dynamically created SVG markup.

## Repository Structure
```
|-- src
|   |-- hoffy.js         # Functional utilities & higher-order function implementations
|   |-- drawing.js       # SVG elements & class-based drawing utilities
|   |-- spotify.js       # Core analysis functions for Spotify data
|   |-- report.js        # Entry point for processing & visualization
|-- data
|   |-- spotify-2023.csv # Dataset containing Spotify's top tracks of 2023
|-- tests
|   |-- hoffy-test.mjs   # Unit tests for higher-order functions
|   |-- drawing-test.mjs # Unit tests for SVG classes
|   |-- spotify-test.mjs # Unit tests for data processing functions
|-- .gitignore
|-- package.json
|-- README.md
```

## Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (>= 14.x recommended)
- **npm** (comes with Node.js)

### Installation
1. Clone this repository from GitHub:
   ```sh
   git clone https://github.com/yourusername/spotify-analyzer.git
   cd spotify-analyzer
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up ESLint for linting:
   ```sh
   npm init @eslint/config@latest
   ```

## Usage

### Running Data Analysis
To analyze the dataset and generate reports:
```sh
node src/report.js data/spotify-2023.csv
```
### Expected Output
1. **Most Streamed Song:** Full object of the song with the highest number of streams.
2. **Songs in Key D#:** A list of song titles in the D# key.
3. **Top 3 Artists by Occurrence:** An SVG visualization of the three most frequently appearing artists.

### Example Output
```json
{
    "track_name": "Dance Monkey",
    "artist(s)_name": ["Tones and I"],
    "streams": 2864791672
}

[
    "ALL MY LIFE (D#)",
    "TATTOO (D#)",
    "OJITOS LINDOS (D#)",
    "INDUSTRY BABY (D#)"
]

{ "Bad Bunny": 40, "Taylor Swift": 38, "The Weeknd": 37 }
```
An **SVG file (`artists.svg`)** will be generated, visualizing the top 3 artists and their occurrences.

## Development
### Running Tests
Execute unit tests to ensure all functions behave correctly:
```sh
npx mocha tests/*.mjs
```

### Linting Code
Run ESLint to check for syntax and styling issues:
```sh
npx eslint src/*
```

### Commit Guidelines
- **Minimum 4 commits** are required, ideally for different sections of the project (functional programming, class-based design, CSV parsing, and visualization).
- Push changes frequently to maintain version control:
  ```sh
  git add .
  git commit -m "Implemented higher-order functions"
  git push origin main
  ```

## Contributing
Contributions are welcome! Feel free to submit an issue or a pull request if you find bugs or have suggestions for improvements.

## License
This project is licensed under the MIT License.

---
Happy Coding 🎵🎨🚀

