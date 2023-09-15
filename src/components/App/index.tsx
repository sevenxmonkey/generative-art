import React, { useState, useEffect, useRef } from 'react';

import { loadTextFileContent, playOscillator, audioAnalyze } from '../../utils/index'

import './App.css';


const App = (): JSX.Element => {
  const canvasRef = useRef(null);

  const [audio1, setAudio1] = useState<HTMLAudioElement | undefined>(undefined);
  const [audio1Data, setAudio1Data] = useState('');

  useEffect(() => {
    loadTextFileContent('assets/thunder1.txt', (data: string) => {
      const audioData = `data:audio/x-wav;base64,${data}`;
      const audioInstance = new Audio(audioData);
      setAudio1Data(audioData);
      setAudio1(audioInstance);
    });
  }, []);

  return (
    <div className="app">
      <button onClick={() => audio1?.play()}>Play</button>
      <button onClick={() => {
        audioAnalyze(canvasRef.current, audio1Data);
      }}>Anayze</button>
      <button onClick={() => playOscillator()}>Oscillator</button>
      <div id='container'>
        <canvas id='canvas1' ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

export default App;
