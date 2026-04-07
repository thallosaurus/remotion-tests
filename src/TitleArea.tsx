import { Img, staticFile } from "remotion"

export const TitleArea: React.FC<{
    title: string,
    artist: string,
    cover: string
}> = ({ title, artist, cover }) => {
    
    let coverElem = null;
    if (cover) {
        const coverPicture = staticFile(cover);
        coverElem = <Img src={coverPicture} style={{
            width: "4em",
            height: "4em",
            border: ".3em solid white",
        }}></Img>
    }
    return (
        <div style={{
            display: "flex",
            gap: "1em"
        }}>
            <div style={{
                
            }}>
                {coverElem}
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