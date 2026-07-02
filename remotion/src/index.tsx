import { registerRoot, Composition } from "remotion";
import React from "react";
import { Reel } from "./Reel";
import sample from "../sample-carousel.json";

const FPS = 30;
const SECS_PER_SLIDE = 3.4;

const Root: React.FC = () => (
  <Composition
    id="Reel"
    component={Reel as any}
    fps={FPS}
    width={1080}
    height={1920}
    defaultProps={sample as any}
    calculateMetadata={({ props }: any) => ({
      durationInFrames: Math.max(1, Math.round((props.slides?.length || 8) * SECS_PER_SLIDE * FPS)),
    })}
  />
);

registerRoot(Root);
