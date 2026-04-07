import { AbsoluteFill, getInputProps, Html5Audio, Img, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { FadeIn } from "./FadeIn";
import { Visualizer } from "./Blob";
import { Background } from "./Background";
import { TitleArea } from "./TitleArea";
import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { CompositionProps } from "./Root";

export const MyComposition = () => {
  const { title, artist, file, cover, artistLogo } = getInputProps<CompositionProps>();
  const p = getInputProps<CompositionProps>();

  const src = staticFile(p.file);
  const frame = useCurrentFrame();

  //const d = useAudioData(src);
  const d = null;
  if (!d) return null;

  const opacity = interpolate(frame, [0, 120], [0, 1], {
    extrapolateRight: "clamp"
  });

  const audioData = linearToLogBins(visualizeAudio({
    audioData: d,
    fps: 60,
    numberOfSamples: 1024,
    frame,
  }), 1024);

  const amp = amplitudeToDb(audioData);

  // background
  // root
  // 
  //const blur = Math.min(0, -2 + (amp * 3))
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <div style={{ opacity }}>

        <Background url={"voronoi hills.jpeg"} amp={amp}></Background>
        <Html5Audio src={src} />
        <AbsoluteFill style={{
          display: "flex",
          justifyContent: "center",
        }}>
          <Visualizer samples={256} src={audioData}></Visualizer>
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
              <TitleArea artist={String(artist ?? "no artist defined")} title={String(title ?? "no title defined")} cover={String(cover ?? "default_cover.png")}></TitleArea>
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