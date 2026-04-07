import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);

const bundled = await bundle({
  entryPoint: require.resolve('./src/index.ts'),
  // If you have a webpack override in remotion.config.ts, pass it here as well.
  webpackOverride: (config) => config,
});

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

console.log('Starting to render composition');

await renderMedia({
  codec: 'h264',
  logLevel: "verbose",
  composition,
  serveUrl: bundled,
  outputLocation: `out/${composition.id}.mp4`,
  chromiumOptions: {
    enableMultiProcessOnLinux: true,
  },
  inputProps,
});

console.log(`Rendered composition ${composition.id}.`);