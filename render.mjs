import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);

const bundled = await bundle({
  entryPoint: require.resolve('./src/index.ts'),
  // If you have a webpack override in remotion.config.ts, pass it here as well.
  webpackOverride: (config) => config,
});

let id = crypto.randomUUID();

const inputProps = {
  //"title": "Lenna On Acid [Buddha On Acid Kick-Edit]",
  artist: "PRiNCESS_M0THBURN",
  file: "track.mp3",
  cover: "cover.png",
  fps: 60,
  artistLogo: null,
  barColor: "#42e6f5",
  background: "Untitled.png"
};

const composition = await selectComposition({
  serveUrl: bundled,
  id: 'Visualizer1',
  inputProps,
});

console.log(`Starting to render composition with id ${id}`);

await renderMedia({
  codec: 'h264',
  composition,
  serveUrl: bundled,
  logLevel: "verbose",
  //outputLocation: `out/${composition.id}.mp4`,
  outputLocation: `out/${id}.mp4`,
  chromiumOptions: {
    enableMultiProcessOnLinux: true,
  },
  inputProps,
});

console.log(`Rendered composition ${composition.id}.`);