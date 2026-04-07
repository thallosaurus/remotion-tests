import { Img, staticFile } from "remotion"

export const TitleArea: React.FC<{
    title: string,
    artist: string,
    cover: string
}> = ({ title, artist, cover }) => {
    const coverPicture = staticFile(cover ?? "default_cover.png")

    return (
        <div style={{
            display: "flex",
            gap: "1em"
        }}>
            <div style={{
                
            }}>
                <Img src={coverPicture} style={{
                    width: "4em",
                    height: "4em",
                    border: ".3em solid white",
                }}></Img>
            </div>
                    <div>
                        <div style={{
                            fontSize: "1em",
                        }}>
                        { title }
                        </div>
        
                        <div style={{
                            fontSize: ".5em"
                        }}>
                        { artist }
                        </div>
                    </div>
        </div>
    )
}