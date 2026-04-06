import { Img, staticFile } from "remotion"

export const TitleArea: React.FC<{
    title: string,
    artist: string,
    cover: string
}> = ({ title, artist, cover }) => {
    const coverPicture = staticFile(cover ?? "default_cover.png")

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "4em 1fr",
            gridTemplateRows: "1fr",
            gap: "1em"
        }}>
            <div>
                <div>
                { title }
                </div>

                <div>
                { artist }
                </div>
            </div>
            <div style={{
                gridArea: "1 / 1 / 4 / 2"
            }}>
                <Img src={coverPicture} style={{
                    width: "4em",
                    height: "4em",
                    border: ".3em solid white"
                }}></Img>
            </div>
        </div>
    )
}