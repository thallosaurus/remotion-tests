import { AbsoluteFill, Html5Audio, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { createSmoothSvgPath, useAudioData, visualizeAudio, visualizeAudioWaveform } from '@remotion/media-utils';


export const Visualizer: React.FC<{ samples: number, src: number[] }> = ({ samples, src }) => {
    const { width } = useVideoConfig();
    //const frame = useCurrentFrame();
    let audioData = src;

    //const v = getFreqDataLinearLog(visu, samples);

    const height = 300;

    /*const p = createSmoothSvgPath({
        points: audioData.map((x, i) => {
            return {
                x: (i / (audioData.length - 1)) * width,
                y: (x) * (height * 0.5) + (height / 2)
            }
        }),
    });*/

    //const barWidth = width / src.length;

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            margin: "1em",
            alignItems: "center"
        }}>
{/*             <div style={{ justifyContent: 'center', alignItems: 'center' }}>
                <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
                    <path stroke="white" fill="white" strokeWidth={10} d={p as string} />
                </svg>
            </div> 
 */}            {/*visu.map((v) => {
                return (
                    <div style={{ width: 100 * v, height: 15, backgroundColor: "blue"}} />
                )
            })*/}
            {audioData.map((x, i) => {
                return (
                    <div key={i} style={{
                        height: `${x * 250 * 15}%`,
                        width: "100%",
                        backgroundColor: "white"
                    }}>
                        
                    </div>
                )
            })}
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
function linearToLogBins(linearData: number[], outputBins = 128, minFreq = 20, maxFreq = 20000): number[] {
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

