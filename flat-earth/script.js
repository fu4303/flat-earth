const box = document.querySelector('section')
const video = document.querySelector('video')

let isMouseDown = false
let initialMouseDownXPosition = 0
let previousX = 0

function spin(x) {
  box.style.transform = `rotateY(${x * 0.5}deg)`
}

function playVideo() {
  const rotationAngle = getRotationAngle(box)

  rotationAngle >= 180 ? video.play() : video.pause()
}

document.addEventListener('mousedown', function (e) {
  // Start mouse tracking
  if (e.target.matches('div.face') || e.target.matches('video.face')) {
    isMouseDown = true
    initialMouseDownXPosition = e.clientX
  }
})

document.addEventListener('mouseup', function (e) {
  if (isMouseDown) {
    const mousePositionX = e.clientX

    // Save how much rotation happened, so next time
    // it continues from there
    previousX = mousePositionX - initialMouseDownXPosition + previousX

    // Reset mouse tracking
    isMouseDown = false
    initialMouseDownXPosition = 0
  }
})

document.addEventListener('mousemove', function (e) {
  if (isMouseDown) {
    const mousePositionX = e.clientX

    const movedX = mousePositionX - initialMouseDownXPosition + previousX

    spin(movedX)
    playVideo()
  }
})
