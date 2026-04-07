import { AbsoluteFill, Html5Audio, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Visualizer } from "./Blob";
import { Background } from "./Background";
import { TitleArea } from "./TitleArea";
import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { Visualizer1Props } from "../Root";

export const Visualizer1: React.FC<Visualizer1Props> = ({ title, artist, file, cover, artistLogo, background, barColor, fps }) => {
  const src = staticFile(file);
  const frame = useCurrentFrame();

  const d = useAudioData(src);
  if (!d) return null;

  const opacity = interpolate(frame, [0, 120], [0, 1], {
    extrapolateRight: "clamp"
  });

  const audioData = linearToLogBins(visualizeAudio({
    audioData: d,
    fps,
    numberOfSamples: 1024,
    frame,
  }), 1024);

  const amp = amplitudeToDb(audioData);

  let bgElem = null;
  if (background) {
    bgElem = <Background url={background} amp={amp} />
  } else {
    bgElem = <AbsoluteFill style={{ backgroundColor: "black"}} /> 
  }

  // background
  // root
  // 
  //const blur = Math.min(0, -2 + (amp * 3))
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <div style={{ opacity }}>
        {bgElem} 
        <Html5Audio src={src} />
        <AbsoluteFill style={{
          display: "flex",
          justifyContent: "center",
        }}>
          <Visualizer src={audioData} barColor={barColor}></Visualizer>
        </AbsoluteFill>

        <AbsoluteFill>
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            margin: "2em"
          }}>
            <div style={{
              textAlign: "center",
              color: "white"
            }}>
              {artistLogo != null ? <Img src={staticFile(String(artistLogo))}></Img> : <></>}
            </div>
            <div style={{
              fontSize: 20,
              color: "white",
              fontFamily: "Arial",
            }}>
              <TitleArea artist={artist} title={title} cover={cover}></TitleArea>
            </div>
          </div>
        </AbsoluteFill>
      </div>
    </AbsoluteFill>
  );
};

function amplitudeToDb(data: number[]): number {
  const minAmp = 1e-8; // verhindert -Infinity
  const minDb = -80;
  const maxDb = 0;

  const d = data.map((amp) => {
    const a = Math.max(amp, minAmp);
    const db = 20 * Math.log10(a);

    const normalized = (db - minDb) / (maxDb - minDb);
    return Math.max(0, Math.min(1, normalized));
  });

  const sum = d.reduce((acc, v) => acc + v * v, 0);
  return Math.sqrt(sum / d.length);
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