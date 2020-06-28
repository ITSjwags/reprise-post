import React, { useEffect, useRef, useState } from 'react'
import { useWindowSize } from 'react-use'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import styled from 'styled-components'
import Carousel from 'nuka-carousel'

import playSrc from '../images/icon-play.svg'
import leftArrowSrc from '../images/icon-leftArrow.svg'
import rightArrowSrc from '../images/icon-rightArrow.svg'

const Slider = (props) => {
  const { openModal, slides } = props
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false)
  const [slideBottomHeight, setSlideBottomHeight] = useState([])
  const { width } = useWindowSize()
  const slideBottomRefs = useRef([])

  const isMobile = width < 767

  useEffect(() => {
    slideBottomRefs.current = slideBottomRefs.current.slice(0, slides.length)
    // set array of bottom bar heights in state
    // and offset the controls to stay center
    // hacky timeout to avoid height calculation before current was set above
    setTimeout(() => {
      setSlideBottomHeight(
        slideBottomRefs.current.map((ref) => ref.clientHeight)
      )
    }, 250)
  }, [slides, slideBottomRefs])

  const handleMouseEnter = () => {
    setIsHoveringCarousel(true)
  }

  const handleMouseLeave = () => {
    setIsHoveringCarousel(false)
  }

  const handleSliderClick = (videoDetails) => {
    openModal(videoDetails)
  }

  return (
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
            show={isMobile || isHoveringCarousel}
          >
            <Icon src={leftArrowSrc} alt="left arrow" />
          </PreviousButton>
        )}
        renderCenterRightControls={({ currentSlide, nextSlide }) => (
          <NextButton
            offset={slideBottomHeight[currentSlide]}
            onClick={nextSlide}
            show={isMobile || isHoveringCarousel}
          >
            <Icon src={rightArrowSrc} alt="right arrow" />
          </NextButton>
        )}
      >
        {slides.map((video, i) => {
          const { editor, id, description, title, thumbnail, vimeoId } = video

          return (
            <SlideContainer
              key={id}
              onClick={() =>
                handleSliderClick({
                  editor,
                  title,
                  description,
                  vimeoId,
                })
              }
            >
              <Img fluid={thumbnail.fluid} alt={thumbnail.alt} />
              <Play
                src={playSrc}
                alt="play icon"
                offset={slideBottomHeight[i]}
                show={isMobile || isHoveringCarousel}
              />
              <SlideBottom ref={(el) => (slideBottomRefs.current[i] = el)}>
                <SlideDescription>
                  <span>{title}</span>
                  <EditorName>((EDITOR: {editor?.name}))</EditorName>
                </SlideDescription>
              </SlideBottom>
            </SlideContainer>
          )
        })}
      </Carousel>
    </CarouselContainer>
  )
}

const CarouselContainer = styled.div`
  flex: 1;

  .slider,
  .slider-list,
  .slider-slide {
    height: 100% !important;
    outline: none;
  }
`

const ControlButton = styled.button`
  color: white;
  cursor: pointer;
  opacity: ${({ show }) => (show ? 0.85 : 0)};
  transform: translateY(-${({ offset }) => offset / 2}px);
  transition: opacity 500ms ease;

  &:hover {
    opacity: 1;
  }
`

const PreviousButton = styled(ControlButton)`
  padding-left: 2vw;

  @media screen and (min-width: 767px) {
    padding-left: 10vw;
  }
`

const NextButton = styled(ControlButton)`
  padding-right: 2vw;

  @media screen and (min-width: 767px) {
    padding-right: 10vw;
  }
`

const Icon = styled.img`
  display: block;
  width: 100%;
`

const SlideContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;
`

const Play = styled.img`
  opacity: ${({ show }) => (show ? 1 : 0)};
  position: absolute;
  top: calc(50% - ${({ offset }) => offset / 2}px);
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 500ms ease;
`

const SlideBottom = styled.div`
  padding: 20px;

  @media screen and (min-width: 767px) {
    padding: 20px 0;
  }
`

const SlideDescription = styled.p`
  background: white;
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;
  font-style: italic;
  letter-spacing: 3px;
  line-height: 1;
  margin: 0;
  opacity: 0;
  padding: 10px;
  text-transform: uppercase;
  transition: opacity 500ms ease;
  width: 100%;

  .slide-current & {
    opacity: 1;
  }

  @media screen and (min-width: 767px) {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
`

const EditorName = styled.span`
  display: block;
  font-size: 14px;
  font-style: italic;
  letter-spacing: 3px;
  line-height: 1;
  margin-top: 10px;
  white-space: nowrap;

  @media screen and (min-width: 767px) {
    display: inline;
    margin-top: 0;
    padding-left: 20px;
  }
`

Slider.propTypes = {
  openModal: PropTypes.func.isRequired,
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      editor: PropTypes.shape({
        name: PropTypes.string,
      }),
      id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.node,
      thumbnail: PropTypes.objectOf(PropTypes.any),
      vimeoId: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default Slider
