import { SceneWithFade } from "../models";

export interface TimedScene {
  delay: number,
  scene: SceneWithFade,
}

export interface Chase {
  timedScenes: TimedScene[],
}