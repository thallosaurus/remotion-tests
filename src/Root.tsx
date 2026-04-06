import { Composition, getInputProps, staticFile } from "remotion";
import { MyComposition } from "./Composition";
import { getAudioDurationInSeconds } from '@remotion/media-utils';

export const RemotionRoot: React.FC = () => {
  const { duration } = getInputProps();

/*   const length = await getAudioDurationInSeconds(file);
  console.log(Math.floor(length * 60));
 */
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={Number(duration ?? 5000)}
        fps={60}
        width={1280}
        height={720}
      />
    </>
  );
};