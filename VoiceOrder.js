import React, { useState, useEffect } from 'react';
import '../styles/VoiceOrder.css';

function VoiceOrder({ onVoiceCommand }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    let recognition = null;
    if ('webkitSpeechRecognition' in window) {
      recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
        onVoiceCommand(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [onVoiceCommand]);

  const toggleListening = () => {
    if (isListening) {
      window.speechRecognition.stop();
    } else {
      window.speechRecognition.start();
    }
  };

  return (
    <div className="voice-order">
      <button 
        className={`voice-btn ${isListening ? 'listening' : ''}`}
        onClick={toggleListening}
      >
        <i className={`fas ${isListening ? 'fa-stop' : 'fa-microphone'}`}></i>
        {isListening ? 'Stop Listening' : 'Voice Order'}
      </button>
      {transcript && (
        <div className="voice-transcript">
          <p>You said: {transcript}</p>
        </div>
      )}
    </div>
  );
}

export default VoiceOrder; 