import React from "react";
import { Composition, Still } from "remotion";
import { SudutGanjilA1 } from "./projects/educational/sudut-ganjil/a1/SudutGanjilA1";
import { SudutGanjilA1Thumbnail } from "./projects/educational/sudut-ganjil/a1/SudutGanjilA1Thumbnail";
import { A1_FPS, A1_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/a1/a1_scenes";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SudutGanjilA1"
        component={SudutGanjilA1}
        durationInFrames={A1_TOTAL_FRAMES}
        fps={A1_FPS}
        width={1920}
        height={1080}
      />
      <Still
        id="ThumbnailA1"
        component={SudutGanjilA1Thumbnail}
        width={1920}
        height={1080}
      />
    </>
  );
};
