function isVideoVisible(target) {
  const obj = window.getComputedStyle(target, null)
  const matrix =
    obj.getPropertyValue('-webkit-transform') ||
    obj.getPropertyValue('-moz-transform') ||
    obj.getPropertyValue('-ms-transform') ||
    obj.getPropertyValue('-o-transform') ||
    obj.getPropertyValue('transform')

  let angle = 0

  if (matrix !== 'none') {
    const values = matrix.split('(')[1].split(')')[0].split(',')
    const a = values[0]
    const b = values[1]
    angle = Math.round(Math.atan2(b, a) * (180 / Math.PI))
  }

  // return angle < 0 ? (angle += 360) : angle
  const finalAngle = angle < 0 ? (angle += 360) : angle

  return finalAngle >= 180 ? true : false
}
