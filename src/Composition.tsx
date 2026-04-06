import { AbsoluteFill, getInputProps, Sequence, staticFile } from "remotion";
import { FadeIn } from "./FadeIn";
import { Visualizer } from "./Blob";
import { Background } from "./Background";
import { TitleArea } from "./TitleArea";

export const MyComposition = () => {
  const { title, artist } = getInputProps();
  const src = staticFile("track.mp3");
  // background
  // root
  // 
  return (

    <>
      <Background url={"Untitled.png"} amp={0}></Background>
      <AbsoluteFill style={{
        display: "flex",
        justifyContent: "center",
        height: "100%"
      }}>
        <Visualizer samples={256} src={src}></Visualizer>
      </AbsoluteFill>

      <AbsoluteFill>
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          height: "100%",
          margin: "2em"
        }}>
          <div style={{
            fontSize: 20,
            color: "white",
            fontFamily: "Helvetica",
          }}>
            <TitleArea artist={String(artist ?? "no artist defined")} title={String(title ?? "no title defined")} cover="default_cover.png"></TitleArea>
          </div>
        </div>
      </AbsoluteFill>
    </>
  );
};
