export const loadTextFileContent = async (path, cb) => {
  try {
    const response = await fetch(path); // Replace with the correct relative path
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.text();
    cb(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export const playOscillator = () => {
  const audioCtx = new window.AudioContext();
  const oscillator = audioCtx.createOscillator();
  oscillator.connect(audioCtx.destination);
  oscillator.type = 'sine';
  oscillator.start();
  setTimeout(() => {
    oscillator.stop();
  }, 100);
}

export const audioAnalyze = (canvas, audioData) => {
  const audio1 = new Audio(audioData);
  audio1.play();

  const audioContext = new AudioContext();
  const audioSource = audioContext.createMediaElementSource(audio1);
  const analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 64;
  analyser.smoothingTimeConstant = 0.85;

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const ctx = canvas.getContext('2d');

  const _animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (audioSource.mediaElement.ended) return;
    analyser.getByteFrequencyData(dataArray);

    for (let i = 0; i < bufferLength; i++) {
      const loudValue = dataArray[i];
      for (let j = 0; j < loudValue; j++) {
        const x = Math.random() * (canvas.width);
        const y = 10 + (canvas.height / bufferLength) * i * 1.1
        const colorCode = _getColorCode(i);
        _drawCircle(ctx, x, y, 2, colorCode);
      }
    }
    setTimeout(() => {
      requestAnimationFrame(() => _animate());
    }, 50);
  }

  _animate();
}

const _drawCircle = (ctx, x, y, radius, colorCode) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = colorCode;
  ctx.fill();
  ctx.closePath();
}

const _getColorCode = (level) => {
  if (level < 10) {
    if (Math.random() < 0.7) {
      return '#01AAFE';
    } else {
      return '#FED401';
    }
  } else if (level < 20) {
    if (Math.random() < 0.5) {
      return '#FED401';
    } else {
      return '#FE7701'
    }
  } else {
    return '#FE7701';
  }
}