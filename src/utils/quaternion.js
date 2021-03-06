// 四元数 https://www.zhihu.com/question/23005815

export default class Quaternion {
  constructor (x, y, z, w) {
    this.x = x
    this.y = y
    this.z = z
    this.w = w
  }
  static formUnit () {
    return new this(0, 0, 0, 1)
  }
  static fromRotation (axis, angle) {
    const DEG2RAD = Math.PI / 180
    const a = angle * DEG2RAD

    const sin = Math.sin(a / 2)
    const cos = Math.cos(a / 2)

    return new this(
      axis[0] * sin, axis[1] * sin, axis[2] * sin,
      cos
    )
  }
  normalize () {
    const norm = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    return new this.constructor(this.x / norm, this.y / norm, this.z / norm, this.w / norm)
  }
  conjugate () {
    return new this.constructor(-this.x, -this.y, -this.z, this.w)
  }
  toString () {
    return [this.x, this.y, this.z, this.w].toString()
  }
  multiply (q) {
    const p = this

    const x = p.w * q.x + p.x * q.w + p.y * q.z - p.z * q.y
    const y = p.w * q.y + p.y * q.w + p.z * q.x - p.x * q.z
    const z = p.w * q.z + p.z * q.w + p.x * q.y - p.y * q.x
    const w = p.w * q.w - p.x * q.x - p.y * q.y - p.z * q.z

    return new this.constructor(x, y, z, w)
  }
  toAxis () {
    return [this.x, this.y, this.z]
  }
  toAngle () {
    const RAD2DEG = 180 / Math.PI
    return RAD2DEG * 2 * Math.acos(this.w)
  }
  toRotation () {
    const axis = this.toAxis()
    const angle = this.toAngle()
    return 'rotate3d(' + axis[0].toFixed(10) + ',' + axis[1].toFixed(10) + ',' + axis[2].toFixed(10) + ',' + angle.toFixed(10) + 'deg)'
  }
  toRotations () {
    const RAD2DEG = 180 / Math.PI

    let x = RAD2DEG * Math.atan2(2 * (this.w * this.x + this.y * this.z), 1 - 2 * (this.x * this.x + this.y * this.y))
    let y = RAD2DEG * Math.asin(2 * (this.w * this.y - this.x * this.z))
    let z = RAD2DEG * Math.atan2(2 * (this.w * this.z + this.x * this.y), 1 - 2 * (this.y * this.y + this.z * this.z))

    if (x < 0) { x += 360 }
    if (y < 0) { y += 360 }
    if (z < 0) { z += 360 }

    return 'rotateX(' + x.toFixed(10) + 'deg) rotateY(' + y.toFixed(10) + 'deg) rotate(' + z.toFixed(10) + 'deg)'
  }
}
