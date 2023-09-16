import React, { useEffect, useRef, useState } from 'react';

import { audioAnalyze } from '../utils/audioAnalyze';
import { loadTextFile } from '../utils/fileLoad';

import './App.scss';

const App = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const [audioBinary, setAudioBinary] = useState<string>('');
  const [audioBinary2, setAudioBinary2] = useState<string>('');

  useEffect(() => {
    loadTextFile('assets/thunder1.txt', (data: string) => {
      const buildAudioBase64 = `data:audio/x-wav;base64,${data}`;
      setAudioBinary(buildAudioBase64);
    })
    loadTextFile('assets/water_sounds.txt', (data: string) => {
      const buildAudioBase64 = `data:audio/x-wav;base64,${data}`;
      setAudioBinary2(buildAudioBase64);
    })
  }, []);

  const resourceLoading = !audioBinary || !canvasRef.current || !canvasRef2.current;
  return (
    <div className='app'>
      <button disabled={resourceLoading} onClick={() => !resourceLoading && audioAnalyze(canvasRef.current, audioBinary)}>Analyze1</button>
      <button disabled={resourceLoading} onClick={() => !resourceLoading && audioAnalyze(canvasRef2.current, audioBinary2)}>Analyze2</button>
      <div>
        <canvas className='analyze-1' ref={canvasRef}></canvas>
        <canvas className='analyze-2' ref={canvasRef2}></canvas>
      </div>
    </div>
  )
}
export default App;
