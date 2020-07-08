const panel = document.querySelector('section')
const video = document.querySelector('video')
const modal = document.querySelector('.modal')
const okButton = document.querySelector('button.ok')
const spinButton = document.querySelector('button.spin-text')

let isMouseDown = false
let initialMouseDownXPosition = 0
let previousX = 50
let lastMouseOrTouchPositon

function spin() {
  const isVisible = isVideoVisible(panel)

  if (!isVisible) {
    panel.style.transition = 'transform 1s'
    panel.style.transform = 'rotateY(180deg)'

    setTimeout(() => {
      panel.style.transition = ''
      previousX = 300
      playVideo()
    }, 800)
  }
}

function rotatePanel(x) {
  panel.style.transform = `rotateY(${x * 0.6}deg)`
}

function playVideo() {
  const isVisible = isVideoVisible(panel)

  if (isVisible) {
    video.play()

    spinButton.style.cursor = 'initial'
    spinButton.style.pointerEvents = 'none'
    spinButton.blur()
  } else {
    video.pause()

    spinButton.style.cursor = 'pointer'
    spinButton.style.pointerEvents = 'initial'
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

    // Webkit also plays video on certain events, like touchend
    playVideo()
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

    rotatePanel(movedX)

    // Tries to play while still spinning, though some
    // browsers won't, so endMoveTrack also calls
    // this function
    playVideo()
  }
}

okButton.addEventListener('click', function () {
  modal.remove()
})

spinButton.addEventListener('click', spin)
spinButton.addEventListener('touchend', spin)

document.addEventListener('mousedown', startMoveTrack)
document.addEventListener('touchstart', startMoveTrack)

document.addEventListener('mouseup', endMoveTrack)
document.addEventListener('touchend', endMoveTrack)

document.addEventListener('mousemove', trackMovement)
document.addEventListener('touchmove', trackMovement)
