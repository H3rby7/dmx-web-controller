export interface ValueForChannel {
  channel: number,
  value: number,
}

export interface Scene {
  list: ValueForChannel[],
}

export interface SceneWithFade {
  scene: Scene,
  fadeTimeMillis: number,
}