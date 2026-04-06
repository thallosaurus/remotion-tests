import { AbsoluteFill, Img, staticFile } from "remotion"

export const Background: React.FC<{ url: string, amp: number }> = ({url, amp}) => {
    return (
        <AbsoluteFill style={{
            filter: "blur(0px)",
            scale: 1.1 + (amp * 0.4)
        }}>
            <Img src={staticFile(url)}></Img>
        </AbsoluteFill>
    )
}