import React, { useState, useEffect, useRef } from "react"
import SEO from "../components/seo"
import { Button, Flex } from "@chakra-ui/react"
import calculateVh from "../utils/calculate-vh"
import isVideoVisible from "../utils/is-video-visible"
import PlayButtonSVG from "../assets/play-button.svg"
import ufoPNG from "../assets/ufo.png"

const IndexPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true)

  const playButtonRef = useRef(null)
  const spinButtonRef = useRef(null)
  const panelRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    calculateVh()

    document.addEventListener("mousedown", startMoveTrack)
    document.addEventListener("touchstart", startMoveTrack)

    document.addEventListener("mouseup", endMoveTrack)
    document.addEventListener("touchend", endMoveTrack)

    document.addEventListener("mousemove", trackMovement)
    document.addEventListener("touchmove", trackMovement)
  }, [startMoveTrack, endMoveTrack, trackMovement])

  let isMouseDown = false
  let initialMouseDownXPosition = 0
  let previousX = 50
  let lastMouseOrTouchPositon

  function spin() {
    const panel = panelRef.current
    const isVisible = isVideoVisible(panel)

    if (!isVisible) {
      panel.style.transition = "transform 1s"
      panel.style.transform = "rotateY(180deg)"

      setTimeout(() => {
        panel.style.transition = ""
        previousX = 300
        playVideo()
      }, 800)
    }
  }

  function rotatePanel(x) {
    const panel = panelRef.current
    panel.style.transform = `rotateY(${x * 0.6}deg)`
  }

  async function playVideo() {
    const panel = panelRef.current
    const video = videoRef.current
    const playButton = playButtonRef.current
    const spinButton = spinButtonRef.current

    const isVisible = isVideoVisible(panel)

    if (isVisible) {
      try {
        await video.play()
        playButton.style.display = "none"
      } catch (error) {
        playButton.style.display = "block"
      }

      spinButton.style.cursor = "initial"
      spinButton.style.pointerEvents = "none"
      spinButton.blur()
    } else {
      video.pause()

      spinButton.style.cursor = "pointer"
      spinButton.style.pointerEvents = "initial"
    }
  }

  function startMoveTrack(e) {
    if (e.target.matches("div.face") || e.target.matches("video.face")) {
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

  // --------------------------------

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <SEO title="Flat Earth" />
      <Flex height="var(--vh)">
        <div className="ufo-container">
          <img className="ufo" width="30px" height="30px" src={ufoPNG} alt="" />
        </div>

        <div className="wrapper">
          <div
            className="modal"
            style={{
              display: isModalOpen ? "flex" : "none",
            }}
          >
            <p>Are you ready to be 🤯?</p>
            <p className="audio-warning">Audio required 🔊</p>

            <Button className="ok" onClick={closeModal}>
              👍
            </Button>
          </div>

          <h1 className="title">Earth is flat and it hides something behind</h1>

          <main>
            <section ref={panelRef}>
              <div className="face front"></div>
              <div className="face front-background"></div>
              <div className="face back">
                <video
                  ref={videoRef}
                  className="face"
                  playsInline
                  loop
                  src="https://res.cloudinary.com/marcelcruz/video/upload/v1594133885/playground/Rick_Astley_-_Never_Gonna_Give_You_Up_xdpvmj.mp4"
                ></video>
                <Button
                  className="play-button"
                  onClick={playVideo}
                  ref={playButtonRef}
                >
                  <img
                    src={PlayButtonSVG}
                    alt="Play button"
                    height="60px"
                    width="60px"
                  />
                </Button>
              </div>
              <div className="face left"></div>
              <div className="face right"></div>
            </section>
          </main>

          <p
            className="spin-text"
            onClick={spin}
            onTouchEnd={spin}
            ref={spinButtonRef}
          >
            <Button className="spin-text">Spin</Button> Earth to reveal its
            secret 🤯
          </p>

          <span className="created-by">
            Created by{" "}
            <Button
              as="a"
              target="_blank"
              href="http://twitter.com/marcelcruz"
              rel="noreferrer noopener"
            >
              @marcelcruz
            </Button>
          </span>
        </div>
      </Flex>
    </>
  )
}

export default IndexPage
