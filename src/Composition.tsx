import { AbsoluteFill, getInputProps, Sequence } from "remotion";
import { FadeIn } from "./FadeIn";
import { Visualizer } from "./Blob";
import { Background } from "./Background";

export interface TrackMetadata {
  artistName: string,
  title: string
}


export const MyComposition = () => {
  const props = getInputProps();

  return (
    <>
      <Background url={"Untitled.png"} amp={0}></Background>
      <AbsoluteFill style={{
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontFamily: "Helvetica",
        color: "white",
        gap: "4em"
      }}>
        <FadeIn title={props["title"] ?? "no title"} frames={30} />
        <div style={{
          verticalAlign: "center",
        }}>
          <Visualizer samples={256}></Visualizer>
        </div>
        <FadeIn title={props["artist"] ?? "no artist"} frames={30} />
      </AbsoluteFill>
    </>
  );
};
