import { interpolate, useCurrentFrame } from "remotion"

export const FadeIn: React.FC<{title: string, frames: number}> = ({title, frames}) => {
    const frame = useCurrentFrame();

    const opacity = interpolate(frame, [0, frames], [0, 1], {
      extrapolateRight: "clamp"
    });

    Math.min(1, frame / frames);
    return (
      <div style={{ opacity: opacity, textAlign: "center", fontSize: "2em" }}>
        {title}
      </div>
    )
}