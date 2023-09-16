export const audioAnalyze = (data: string, callBack?: (data: Uint8Array) => void) => {
  const audioEle = new Audio(data);
  audioEle.play();

  const audioCtx = new AudioContext();
  const audioMediaSource = audioCtx.createMediaElementSource(audioEle);
  const analyserNode = audioCtx.createAnalyser();
  audioMediaSource.connect(analyserNode);
  analyserNode.connect(audioCtx.destination);
  analyserNode.fftSize = 128;
  analyserNode.smoothingTimeConstant = 0.85;

  const bufferLength = analyserNode.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const _animate = () => {
    if (audioMediaSource.mediaElement.ended) return;

    analyserNode.getByteFrequencyData(dataArray);
    callBack?.(dataArray);
    requestAnimationFrame(() => _animate());
  }
  _animate();
}
