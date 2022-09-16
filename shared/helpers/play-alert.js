import _ from 'lodash';
import { Howl } from 'howler';

export const playAlert = function (src) {
  const sound = new Howl({
    autoUnlock: true,
    src,
    format: ['m4a', 'mp3', 'webm'],
  });

  sound.on('end', () => {
    sound.unload();
  });

  sound.on('load', () => {
    sound.play();
  });
};
