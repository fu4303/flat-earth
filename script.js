const box = document.querySelector('section')
const video = document.querySelector('video')
const modal = document.querySelector('.modal')
const okButton = document.querySelector('button.ok')
const spinButton = document.querySelector('button.spin')

let isMouseDown = false
let initialMouseDownXPosition = 0
let previousX = 50
let lastMouseOrTouchPositon

okButton.addEventListener('click', function () {
  modal.remove()
})

spinButton.addEventListener('click', function () {
  const isVisible = isVideoVisible(box)

  if (!isVisible) {
    box.style.transition = 'transform 1s'
    box.style.transform = 'rotateY(180deg)'

    setTimeout(() => {
      box.style.transition = ''
      previousX = 300
      playVideo()
    }, 800)
  }
})

function spin(x) {
  box.style.transform = `rotateY(${x * 0.6}deg)`
}
function playVideo() {
  const isVisible = isVideoVisible(box)

  if (isVisible) {
    video.play()

    spinButton.style.cursor = 'initial'
    spinButton.style.pointerEvents = 'none'
    spinButton.style.textDecoration = 'none'
    spinButton.blur()
  } else {
    video.pause()

    spinButton.style.cursor = 'pointer'
    spinButton.style.pointerEvents = 'initial'
    spinButton.style.textDecoration = 'underline'
  }
}

function startMoveTrack(e) {
  if (e.target.matches('div.face') || e.target.matches('video.face')) {
    isMouseDown = true
    initialMouseDownXPosition = e.clientX || e.touches[0].clientX
  }
}

function endMoveTrack() {
  if (isMouseDown) {
    // This ensures that a click with no movement doesn't
    // set previousX to NaN
    if (lastMouseOrTouchPositon) {
      // Save how much rotation happened, so next time
      // it continues from there
      previousX =
        lastMouseOrTouchPositon - initialMouseDownXPosition + previousX
    }

    // Reset mouse tracking
    isMouseDown = false
    initialMouseDownXPosition = 0
  }
}

function trackMovement(e) {
  if (isMouseDown) {
    const mousePositionX = e.clientX || e.touches[0].clientX

    const movedX = parseInt(
      mousePositionX - initialMouseDownXPosition + previousX,
      10
    )
    lastMouseOrTouchPositon = mousePositionX

    spin(movedX)
    playVideo()
  }
}
document.addEventListener('mousedown', e => startMoveTrack(e))
document.addEventListener('touchstart', e => startMoveTrack(e))

document.addEventListener('mouseup', () => endMoveTrack())
document.addEventListener('touchend', () => endMoveTrack())

document.addEventListener('mousemove', e => trackMovement(e))
document.addEventListener('touchmove', e => trackMovement(e))
