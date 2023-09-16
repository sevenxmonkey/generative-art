import React, { useEffect, useState } from 'react';

import { audioAnalyze } from '../utils/audioAnalyze';
import { loadTextFile } from '../utils/fileLoad';

import './App.scss';

const App = (): JSX.Element => {
  const [audioBinary, setAudioBinary] = useState<string>('');

  const [bufferData, setBufferData] = useState<string>('');

  useEffect(() => {
    loadTextFile('assets/thunder1.txt', (data: string) => {
      const buildAudioBase64 = `data:audio/x-wav;base64,${data}`;
      setAudioBinary(buildAudioBase64);
    });
  }, []);

  return (
    <div className='app'>
      <button disabled={!audioBinary} onClick={() => !!audioBinary && audioAnalyze(audioBinary, (data: Uint8Array) => {
        setBufferData(data.join(','));
      })}>Analyze1</button>
      <div style={{ color: "white" }}>{bufferData}</div>
    </div>
  )
}
export default App;
