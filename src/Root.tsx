import { Composition, getInputProps, staticFile } from "remotion";
import { MyComposition } from "./Composition";
import { getAudioDurationInSeconds } from '@remotion/media-utils';

export type CompositionProps = {
  title: string,
  artist: string,
  file: string,
  cover: string | null,
  artistLogo: string | null
  background: string | null,
  fps: number,
  barColor: string
}

export const RemotionRoot: React.FC<CompositionProps> = () => {
  return (
    <>
      <Composition
        id="Visualizer1"
        component={MyComposition}
        width={1280}
        height={720}
        defaultProps={{
          title: "no title set",
          artist: "no artist set",
          file: "track.mp3",
          cover: null,
          fps: 60,
          artistLogo: null,
          barColor: "blue",
          background: null
        }}
        calculateMetadata={async ({ defaultProps, props }) => {
          const data = staticFile(props.file ?? defaultProps.file);
          const seconds = await getAudioDurationInSeconds(data);
          return {
            props: {
              ...props
            },
            durationInFrames: Math.floor(seconds) * 60,
            fps: props.fps
          }
        }}
      />
    </>
  );
};