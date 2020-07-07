const box = document.querySelector("section")

let isMouseDown = false

let initialMouseDownXPosition = 0
let initialMouseDownYPosition = 0

let previousX = 0
let previousY = 0

function spin(x, y) {
  box.style.transform = `rotateX(${y * -0.5}deg) rotateY(${x * 0.5}deg)`
}

document.addEventListener("mousedown", function (e) {
  isMouseDown = true
  initialMouseDownXPosition = e.clientX
  initialMouseDownYPosition = e.clientY
})

document.addEventListener("mouseup", function (e) {
  const mousePositionX = e.clientX
  const mousePositionY = e.clientY

  // Save how much rotation happened, so next time
  // it continues from there
  previousX = mousePositionX - initialMouseDownXPosition + previousX
  previousY = mousePositionY - initialMouseDownYPosition + previousY

  // Reset mouse tracking
  isMouseDown = false
  initialMouseDownXPosition = 0
  initialMouseDownYPosition = 0
})

document.addEventListener("mousemove", function (e) {
  if (isMouseDown) {
    const mousePositionX = e.clientX
    const mousePositionY = e.clientY

    const xMoved = mousePositionX - initialMouseDownXPosition + previousX
    const yMoved = mousePositionY - initialMouseDownYPosition + previousY

    spin(xMoved, yMoved)
  }
})
