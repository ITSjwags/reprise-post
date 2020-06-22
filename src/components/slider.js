import React, { useEffect, useRef, useState } from 'react'
import { useWindowSize } from 'react-use'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Carousel from 'nuka-carousel'

const Slider = (props) => {
  const { slides } = props
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false)
  const [slideBottomHeight, setSlideBottomHeight] = useState([])
  const { width } = useWindowSize()
  const slideBottomRefs = useRef([])

  const isMobile = width < 767

  useEffect(() => {
    slideBottomRefs.current = slideBottomRefs.current.slice(0, slides.length)
    // set array of bottom bar heights in state
    // and offset the controls to stay center
    setSlideBottomHeight(slideBottomRefs.current.map((ref) => ref.clientHeight))
    // TODO: figure out why this number isn't always correct
    console.log(slideBottomRefs.current.map((ref) => ref.clientHeight))
  }, [slides, slideBottomRefs])

  const handleMouseEnter = () => {
    setIsHoveringCarousel(true)
  }

  const handleMouseLeave = () => {
    setIsHoveringCarousel(false)
  }

  return (
    <>
      <CarouselContainer
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Carousel
          autoGenerateStyleTag={false}
          cellAlign="center"
          cellSpacing={20}
          easing="easeQuadInOut"
          enableKeyboardControls
          heightMode="max"
          slideIndex={1}
          slidesToShow={isMobile ? 1 : 3}
          slideWidth={isMobile ? 1 : 1.75}
          wrapAround
          renderBottomCenterControls={() => null}
          renderCenterLeftControls={({ currentSlide, previousSlide }) => (
            <PreviousButton
              offset={slideBottomHeight[currentSlide]}
              onClick={previousSlide}
              show={isHoveringCarousel}
            >
              Previous
            </PreviousButton>
          )}
          renderCenterRightControls={({ currentSlide, nextSlide }) => (
            <NextButton
              offset={slideBottomHeight[currentSlide]}
              onClick={nextSlide}
              show={isHoveringCarousel}
            >
              Next
            </NextButton>
          )}
        >
          {slides.map((video, i) => {
            const { editor, id, shortDescription, vimeoLink } = video

            return (
              <SlideContainer key={id}>
                <Slide src={vimeoLink?.thumbnailUrl} alt={vimeoLink?.title} />
                <SlideBottom ref={(el) => (slideBottomRefs.current[i] = el)}>
                  <SlideDescription>
                    {shortDescription} (({editor?.name}))
                  </SlideDescription>
                </SlideBottom>
              </SlideContainer>
            )
          })}
        </Carousel>
      </CarouselContainer>
      {/* TODO: put this in a modal */}
      {/* <VideoWrapper>
            <Video
              src={`https://player.vimeo.com/video/${vimeoLink?.providerUid}?autoplay=1`}
              width="640"
              height="360"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </VideoWrapper> */}
    </>
  )
}

const CarouselContainer = styled.div`
  flex: 1;

  .slider,
  .slider-list,
  .slider-slide {
    height: 100% !important;
  }
`

const ControlButton = styled.button`
  color: white;
  cursor: pointer;
  transform: translateY(-${({ offset }) => offset / 2}px);
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 250ms ease;
`

const PreviousButton = styled(ControlButton)`
  padding-left: 10vw;
`

const NextButton = styled(ControlButton)`
  padding-right: 10vw;
`

const SlideContainer = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  width: 100%;
`

const Slide = styled.img`
  object-fit: cover;
  width: 100%;
`

const SlideBottom = styled.div`
  padding: 20px 0;
`

const SlideDescription = styled.p`
  background: white;
  margin: 0;
  opacity: 0;
  padding: 10px;
  transition: opacity 500ms ease;
  width: 100%;

  .slide-current & {
    opacity: 1;
  }
`

// const VideoWrapper = styled.div`
//   height: 0;
//   position: relative;
//   padding-bottom: 56.25%; /* 16:9 */
// `

// const Video = styled.iframe`
//   height: 100%;
//   left: 0;
//   position: absolute;
//   top: 0;
//   width: 100%;
// `

Slider.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      editor: PropTypes.shape({
        name: PropTypes.string,
      }),
      id: PropTypes.string,
      shortDescription: PropTypes.string,
      videoName: PropTypes.string,
      vimeoLink: PropTypes.shape({
        height: PropTypes.number,
        providerUid: PropTypes.string,
        thumbnailUrl: PropTypes.string,
        title: PropTypes.string,
        width: PropTypes.number,
      }),
    })
  ).isRequired,
}

export default Slider
