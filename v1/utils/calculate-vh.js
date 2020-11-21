function createHeightVariable() {
  const vh = window.innerHeight
  document.documentElement.style.setProperty("--vh", `${vh}px`)
}

createHeightVariable()
