import React, { useEffect, useRef, useState } from 'react'
import { useMeasure, useWindowSize } from 'react-use'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import styled from 'styled-components'
import Carousel from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'

import playSrc from '../images/icon-play.svg'

const Slider = (props) => {
  const { openModal, slides } = props
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false)
  const [slideBottomHeight, setSlideBottomHeight] = useState([])
  const { width } = useWindowSize()
  const [slideRef, { height: slideHeight }] = useMeasure()
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

  const handleCarouselEnter = () => {
    setIsHoveringCarousel(true)
  }

  const handleCarouselLeave = () => {
    setIsHoveringCarousel(false)
  }

  const handleSliderClick = (videoDetails) => {
    openModal(videoDetails)
  }

  return (
    <CarouselContainer
      onMouseEnter={handleCarouselEnter}
      onMouseLeave={handleCarouselLeave}
      ref={slideRef}
    >
      <Carousel
        centered
        clickToChange
        dots={isMobile ? true : false}
        draggable={isMobile ? true : false}
        infinite
        keepDirectionWhenDragging
        lazyLoad
        slidesPerPage={2}
        breakpoints={{
          767: {
            slidesPerPage: 1,
          },
        }}
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
              height={slideHeight}
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
`

const SlideContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${({ height }) => height}px;
  justify-content: center;
  opacity: 0.5;
  padding: 0 10px;
  position: relative;
  transform: scale(0.95);
  transition: transform 250ms ease;
  width: 100%;

  &:active {
    pointer-events: none;
  }

  &:hover {
    transform: scale(0.975);
  }

  .BrainhubCarouselItem--active & {
    opacity: 1;
    pointer-events: auto;
    transform: scale(1);
  }
`

const Play = styled.img`
  opacity: 0;
  position: absolute;
  top: calc(50% - ${({ offset }) => offset / 2}px);
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 500ms ease;

  .BrainhubCarouselItem--active & {
    opacity: ${({ show }) => (show ? 1 : 0)};
  }
`

const SlideBottom = styled.div`
  padding: 20px;

  @media screen and (min-width: 767px) {
    padding: 20px 0 23px 0;
  }
`

const SlideDescription = styled.p`
  background: white;
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;
  letter-spacing: 3px;
  margin: 0;
  opacity: 0;
  padding: 10px;
  text-transform: uppercase;
  transition: opacity 500ms ease;
  width: 100%;

  .BrainhubCarouselItem--active & {
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
