export const audioAnalyze = (canvas: HTMLCanvasElement, data: string) => {
  const audioEle = new Audio(data);
  audioEle.play();

  const audioCtx = new AudioContext();
  const audioMediaSource = audioCtx.createMediaElementSource(audioEle);
  const analyserNode = audioCtx.createAnalyser();
  audioMediaSource.connect(analyserNode);
  analyserNode.connect(audioCtx.destination);
  analyserNode.fftSize = 64;
  analyserNode.smoothingTimeConstant = 0.85;

  const bufferLength = analyserNode.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const ctx = canvas.getContext('2d');
  const _animate = () => {
    if (audioMediaSource.mediaElement.ended || !ctx) return;
    ctx?.clearRect(0, 0, canvas.width, canvas.height);

    analyserNode.getByteFrequencyData(dataArray);

    console.log(dataArray.join(','));
    /**
     * Visualize data array
     */
    _drawCircles(ctx, dataArray)

    requestAnimationFrame(() => _animate());
  }
  _animate();
}

const _drawCircles = (ctx: CanvasRenderingContext2D, dataArray: Uint8Array): void => {
  for (let i = 0; i < dataArray.length; i++) {
    const loadValue = dataArray[i];
    for (let j = 0; j < loadValue * 0.3; j++) {
      const x = Math.random() * (ctx.canvas.width);
      const y = 10 + (ctx.canvas.height / dataArray.length) * i * 1.1
      const colorCode = _getColorCode(i);

      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = colorCode;
      ctx.fill();
      ctx.closePath();
    }
  }
}


const _getColorCode = (level: number) => {
  const probabilities: number[] = [];

  if (level < 10) {
    probabilities.push(0.8, 0.5, 0.4);
  } else if (level <= 20) {
    probabilities.push(0.5, 0.8, 0.2);
  } else {
    probabilities.push(0.2, 0.5, 0.8);
  }
  const randomValue = Math.random();
  if (randomValue < probabilities[0]) {
    return "#01AAFE";
  } else if (randomValue < probabilities[0] + probabilities[2]) {
    return "#FED401";
  } else {
    return "#FE7701";
  }
}