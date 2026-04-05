import { AbsoluteFill, Html5Audio, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { createSmoothSvgPath, useAudioData, visualizeAudio, visualizeAudioWaveform } from '@remotion/media-utils';


export const Visualizer: React.FC<{ samples: number }> = ({ samples }) => {
    const src = staticFile("track.mp3");
    const frame = useCurrentFrame();
    const audioData = useAudioData(src);
    const { width, fps } = useVideoConfig();

    if (!audioData) return null;

    const waveform = visualizeAudioWaveform({
        fps,
        frame,
        audioData,
        numberOfSamples: samples,
        windowInSeconds: 1 / fps
    });

    /*const visu = visualizeAudio({
        fps: 60,
        frame,
        audioData,
        numberOfSamples: samples
    });*/

    //const v = getFreqDataLinearLog(visu, samples);

    const height = 300;

    const p = createSmoothSvgPath({
        points: waveform.map((x, i) => {
            return {
                x: (i / (waveform.length - 1)) * width,
                y: (x) * (height * 0.5) + (height / 2)
            }
        })
    });

    return (

            <div style={{ flex: 1 }}>
                <Html5Audio src={src} />
                <div style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
                        <path stroke="white" fill="white" strokeWidth={10} d={p as string} />
                    </svg>
                </div>
            </div>

    )
}
/* 
export const Blob = ({src}) => {

  if (!audioData) return null;

  const visualization = visualizeAudio({
    fps: 60,
    frame,
    audioData,
    numberOfSamples: 128,
  });

  return (
    <svg width="500" height="500">
      {visualization.map((v, i) => {
        const angle = (i / visualization.length) * Math.PI * 2;

        const r = 150 + v * 200;

        const x = 250 + Math.cos(angle) * r;
        const y = 250 + Math.sin(angle) * r;

        return (
          <line
            key={i}
            x1={250}
            y1={250}
            x2={x}
            y2={y}
            stroke="white"
            strokeWidth={2}
          />
        );
      })}
    </svg>
  );
}; */

function getFreqData(frequencyData: number[]): number[] {

    // default scaling factors from the W3C spec for getByteFrequencyData
    const minDb = -100;
    const maxDb = -30;

    return frequencyData.map((value) => {
        // convert to decibels (will be in the range `-Infinity` to `0`)
        const db = 20 * Math.log10(value);

        // scale to fit between min and max
        const scaled = (db - minDb) / (maxDb - minDb);

        return scaled;
    });
}
function linearToLogBins(linearData: number[], minFreq = 20, maxFreq = 20000, outputBins = 128): number[] {
    const logData: number[] = [];
    const minLog = Math.log10(minFreq);
    const maxLog = Math.log10(maxFreq);

    for (let i = 0; i < outputBins; i++) {
        const logIndex = 10 ** (minLog + (i / outputBins) * (maxLog - minLog));
        // map logIndex (Hz) auf linearData index
        const linearIndex = Math.floor((logIndex / maxFreq) * linearData.length);
        logData.push(linearData[linearIndex] ?? 0);
    }

    return logData;
}

function getFreqDataLinearLog(frequencyData: number[], samples: number): number[] {
    // 1. normalize linear amplitude
    const normalized = frequencyData.map(v => Math.max(v, 0));

    // 2. convert linear → logarithmic bins
    const logBins = linearToLogBins(normalized, 20, 20000, samples);

    // 3. optional sqrt scaling
    return logBins.map(v => Math.sqrt(v));
}