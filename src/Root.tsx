import { Composition, getInputProps, staticFile } from "remotion";
import { MyComposition } from "./Composition";
import { getAudioDurationInSeconds } from '@remotion/media-utils';

export type CompositionProps = {
  title: string,
  artist: string,
  file: string,
  cover: string,
  artistLogo: string | null
  fps: number
}

export const RemotionRoot: React.FC<CompositionProps> = () => {

/*   const length = await getAudioDurationInSeconds(file);
  console.log(Math.floor(length * 60));
 */
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        width={1280}
        height={720}
        defaultProps={{
          title: "no title set",
          artist: "no artist set",
          file: "default.mp3",
          cover: "cover.png",
          fps: 60,
          artistLogo: null
        }}
        calculateMetadata={async ({ defaultProps, props }) => {
          console.log(props.file ?? defaultProps.file);
          const data = staticFile(props.file ?? defaultProps.file);
          const seconds = await getAudioDurationInSeconds(data);
          return {
            durationInFrames: Math.floor(seconds) * 60,
            fps: props.fps
          }
        }}
      />
    </>
  );
};