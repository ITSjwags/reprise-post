import React, { useEffect, useRef, useState } from 'react'
import { useWindowSize } from 'react-use'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import styled from 'styled-components'
import Carousel from 'nuka-carousel'
import { motion } from 'framer-motion'

import playSrc from '../images/icon-play.svg'

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
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 1 }}
    >
      <Carousel
        cellAlign="center"
        disableEdgeSwiping
        easing="easeQuadInOut"
        edgeEasing="easeQuadInOut"
        enableKeyboardControls
        heightMode="max"
        slidesToShow={isMobile ? 1 : 3}
        slideWidth={isMobile ? 1 : 2}
        wrapAround
        renderCenterLeftControls={({ previousSlide }) => (
          <PrevButton aria-label="previous" onClick={previousSlide} />
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <NextButton aria-label="next" onClick={nextSlide} />
        )}
      >
        {slides.map((video, i) => {
          const { editor, id, description, title, thumbnail, vimeoId } = video

          return (
            <SlideContainer
              key={id}
              gap={slideBottomHeight[i] / 2}
              onClick={() =>
                handleSliderClick({
                  editor,
                  title,
                  description,
                  vimeoId,
                })
              }
            >
              <Img
                style={{ height: '100%', width: '100%' }}
                imgStyle={{ objectFit: 'cover' }}
                fluid={thumbnail.fluid}
                alt={thumbnail.alt}
              />
              <Play
                src={playSrc}
                alt="play icon"
                show={isMobile || isHoveringCarousel}
              />
              <SlideBottom
                ref={(el) => (slideBottomRefs.current[i] = el)} offset={slideBottomHeight[i] / 2}
              >
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

const CarouselContainer = styled(motion.div)`
  flex: 1;

  .slider,
  .slider-list,
  .slider-slide {
    height: 100% !important;
    outline: none;
  }

  .slider-control-centerright,
  .slider-control-centerleft {
    position: static !important;
    transform: none !important;
  }

  .slider-control-bottomcenter {
    > ul {
      top: -10px !important;
    }
  }

  .paging-dot {
    width: 40px;
    height: 20px;
  }

  .paging-dot > circle {
    r: 5px;
    cx: 10px;
    cy: 10px;
  }
`

const ControlButton = styled.button`
  @media screen and (min-width: 767px) {
    background: transparent;
    cursor: pointer;
    height: 100%;
    position: absolute;
    top: 0;
    width: 16.7vw;
  }
`

const PrevButton = styled(ControlButton)`
  left: 0;
`

const NextButton = styled(ControlButton)`
  right: 0;
`

const SlideContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 82%;
  opacity: 0.5;
  justify-content: center;
  position: relative;
  width: 100%;

  .slide-current & {
    opacity: 1;
  }

  @media screen and (min-width: 767px) {
    height: calc(100% - 70px);
  }
`

const Play = styled.img`
  opacity: ${({ show }) => (show ? 1 : 0)};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 500ms ease;
`

const SlideBottom = styled.div`
  position: absolute;
  bottom: -${({ offset }) => offset}px;
  left: 5%;
  width: 90%;
`

const SlideDescription = styled.p`
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.1);
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;
  letter-spacing: 0.2em;
  margin: 0;
  opacity: 0;
  padding: 10px 15px;
  text-transform: uppercase;
  transition: opacity 500ms ease;
  width: 100%;

  .slide-current & {
    opacity: 1;
  }

  @media screen and (min-width: 767px) {
    align-items: center;
    display: flex;
    font-size: 20px;
    justify-content: space-between;
  }
`

const EditorName = styled.span`
  display: block;
  font-size: 14px;
  letter-spacing: 0.2em;
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
