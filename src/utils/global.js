// 全局变量
export const Face = {
  SIZE: 100,
  LEFT: 0,
  RIGHT: 1,
  TOP: 2,
  BOTTOM: 3,
  FRONT: 4,
  BACK: 5
}

export const ROTATION = [
  [Face.TOP, Face.FRONT, Face.BOTTOM, Face.BACK].reverse(),
  [Face.LEFT, Face.BACK, Face.RIGHT, Face.FRONT].reverse(),
  [Face.LEFT, Face.BOTTOM, Face.RIGHT, Face.TOP].reverse()
]

export default { Face, ROTATION }
