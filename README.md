# Speech to Text with Deepgram API

A simple web application that converts speech to text in real-time using Deepgram's API.

## Live Demo

[View on GitHub Pages](https://yourusername.github.io/speech-to-text-deepgram)

## Features

- Real-time speech recognition
- Simple start/stop interface
- Clean display of transcribed text

## Setup

1. **Get a Deepgram API Key**:
   - Sign up at [Deepgram](https://deepgram.com/)
   - Get your API key from the dashboard

2. **Configure the Application**:
   - Replace `YOUR_DEEPGRAM_API_KEY` in `script.js` with your actual API key

3. **Run Locally**:
   - Simply open `index.html` in a browser
   - Make sure you're using HTTPS (GitHub Pages provides this)

## Deployment to GitHub Pages

1. Create a new repository on GitHub
2. Upload all the project files
3. Go to Settings > Pages
4. Select the main branch and click "Save"
5. Your app will be available at `https://yourusername.github.io/repository-name`

## Notes

- For security, this demo includes the API key directly in the JavaScript file. In a production environment, you should use a backend service to handle the API key.
- The app requires microphone access.
