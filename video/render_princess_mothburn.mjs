import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';
import {createRequire} from 'node:module';
import { exit } from 'node:process';
import { parseArgs } from 'node:util';

const {
  values: { title, file }
} = parseArgs({
  options: {
    title: {
      type: "string"
    },
    file: {
      type: "string"
    },
    /*cover: {
      type: "string"
    }*/
  }
})

if (!title) {
  console.error("track title was not set")
  exit();
}

if (!file) {
  console.error("file was not set")
  exit();
}

const require = createRequire(import.meta.url);

const bundled = await bundle({
  entryPoint: require.resolve('./src/index.ts'),
  // If you have a webpack override in remotion.config.ts, pass it here as well.
  webpackOverride: (config) => config,
});

const inputProps = {
  title,
  //"title": "Lenna On Acid [Buddha On Acid Kick-Edit]",
  artist: "PRiNCESS_M0THBURN",
  file,
  cover: null,
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