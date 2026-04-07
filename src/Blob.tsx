export const Visualizer: React.FC<{ src: number[], barColor: string }> = ({ src, barColor }) => {
    //const frame = useCurrentFrame();
    let audioData = src;

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            margin: "1em",
            alignItems: "center",
            gap: "3px"
        }}>
            {audioData.map((x, i) => {
                return (
                    <div key={i} style={{
                        height: `${x * 250 * 10}%`,
                        width: "100%",
                        backgroundColor: barColor
                    }}>
                    </div>
                )
            })}
        </div>
    )
}

function getFreqData(frequencyData: number[]): number[] {

    // default scaling factors from the W3C spec for getByteFrequencyData
    const minDb = -100;
    const maxDb = -30;

    return frequencyData.map((value) => {
        // convert to decibels (will be in the range `-Infinity` to `0`)
        const db = 20 * Math.log10(value);

        // scale to fit between min and max
        const scaled = (db - minDb) / (maxDb - minDb);

        return scaled;
    });
}
function linearToLogBins(linearData: number[], outputBins = 128, minFreq = 20, maxFreq = 20000): number[] {
    const logData: number[] = [];
    const minLog = Math.log10(minFreq);
    const maxLog = Math.log10(maxFreq);

    for (let i = 0; i < outputBins; i++) {
        const logIndex = 10 ** (minLog + (i / outputBins) * (maxLog - minLog));
        // map logIndex (Hz) auf linearData index
        const linearIndex = Math.floor((logIndex / maxFreq) * linearData.length);
        logData.push(linearData[linearIndex] ?? 0);
    }

    return logData;
}

function getFreqDataLinearLog(frequencyData: number[], samples: number): number[] {
    // 1. normalize linear amplitude
    const normalized = frequencyData.map(v => Math.max(v, 0));

    // 2. convert linear → logarithmic bins
    const logBins = linearToLogBins(normalized, 20, 20000, samples);

    // 3. optional sqrt scaling
    return logBins.map(v => Math.sqrt(v));
}

