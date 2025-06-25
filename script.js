// For GitHub Pages, you'll need to put your API key directly in the code
// Note: This is not secure for production - only for demo purposes
// For a real application, you should use a backend service to handle the API key

const DEEPGRAM_API_KEY = 'f3f80bf15c4ba53a4a0a93ecae2981546bd54485'; // Replace with your actual key

let socket;
let isRecording = false;
const transcriptElement = document.getElementById('transcript');
const statusElement = document.getElementById('status');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');

startBtn.addEventListener('click', startRecording);
stopBtn.addEventListener('click', stopRecording);

async function startRecording() {
    if (isRecording) return;
    
    try {
        statusElement.textContent = "Starting...";
        
        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Create WebSocket connection to Deepgram
        socket = new WebSocket('wss://api.deepgram.com/v1/listen', [
            'token', DEEPGRAM_API_KEY
        ]);
        
        socket.onopen = () => {
            isRecording = true;
            startBtn.disabled = true;
            stopBtn.disabled = false;
            statusElement.textContent = "Listening...";
            
            // Send audio stream to Deepgram
            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm'
            });
            
            mediaRecorder.addEventListener('dataavailable', (event) => {
                if (event.data.size > 0 && socket.readyState === 1) {
                    socket.send(event.data);
                }
            });
            
            mediaRecorder.start(1000);
            
            // Stop recording when socket closes
            socket.onclose = () => {
                mediaRecorder.stop();
                stream.getTracks().forEach(track => track.stop());
            };
        };
        
        socket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            const transcript = data.channel.alternatives[0].transcript;
            
            if (transcript && data.is_final) {
                transcriptElement.textContent += transcript + ' ';
            }
        };
        
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
            statusElement.textContent = "Error occurred";
            stopRecording();
        };
        
    } catch (error) {
        console.error('Error:', error);
        statusElement.textContent = "Error: " + error.message;
        stopRecording();
    }
}

function stopRecording() {
    if (socket) {
        socket.close();
    }
    isRecording = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    statusElement.textContent = "Press 'Start Listening' to begin";
}
