import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

import backgroundSrc from '../images/background-purple.jpg'
import closeSrc from '../images/icon-close.svg'

const VideoModal = (props) => {
  const { onClose, editor, title, description, vimeoId } = props

  return (
    <AnimatePresence>
      <Modal
        key="videoModal"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ ease: 'easeOut', duration: 0.25 }}
      >
        <ModalContent
          key="videoModalContent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ delay: 0.5 }}
        >
          <VideoContent>
            <Video
              src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
              width="640"
              height="360"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
            <VideoBottom>
              <VideoDetails>
                <Title>{title}</Title>
                {description && (
                  <Description
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  />
                )}
              </VideoDetails>
              <Editor>((Editor: {editor}))</Editor>
            </VideoBottom>
          </VideoContent>
          <ModalClose
            onClick={onClose}
            // onKeyPress={(e) => (e.keyCode === 13 ? onClose() : null)}
          >
            <Icon src={closeSrc} alt="close icon" />
          </ModalClose>
        </ModalContent>
      </Modal>
    </AnimatePresence>
  )
}

const Modal = styled(motion.div)`
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(2px);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;

  /* &::after {
    background: url(${backgroundSrc}) no-repeat top center;
    background-size: cover;
    content: '';
    opacity: 0.98;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  } */
`

const ModalClose = styled.button`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  transition: transform 250ms ease-out;
  width: 44px;

  &:hover {
    transform: rotate(90deg);
  }

  @media screen and (min-width: 767px) {
    position: static;
  }
`

const Icon = styled.img`
  display: block;
  width: 100%;
`

const ModalContent = styled(motion.div)`
  height: 100%;
  padding: 84px 20px 20px 20px;

  @media screen and (min-width: 767px) {
    align-items: start;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 20px;
    margin: 0 auto;
    padding: 5vh;
    width: 85%;
    max-width: 1483px;
  }
`

const VideoContent = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  grid-gap: 20px;
  height: 100%;
`

const Video = styled.iframe`
  align-self: stretch;
  height: auto;
  width: 100%;

  @media screen and (min-width: 767px) {
    background: black;
  }
`

const VideoBottom = styled.div`
  @media screen and (min-width: 767px) {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 20px;
  }
`

const VideoDetails = styled.div`
  background: white;
  padding: 20px;

  a {
    color: ${({ theme }) => theme.colors.purple};
    font-weight: normal;
    transition: all 250ms ease;

    &:hover {
      text-decoration: underline;
    }
  }
`

const Title = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 3.2px;
  text-transform: uppercase;
`

const Description = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;
  letter-spacing: 0.6px;
`

const Editor = styled.p`
  color: white;
  font-size: 18px;
  letter-spacing: 3.2px;
  padding-top: 20px;
  text-transform: uppercase;
`

VideoModal.propTypes = {
  editor: PropTypes.string,
  description: PropTypes.node,
  onClose: PropTypes.func,
  title: PropTypes.string,
  vimeoId: PropTypes.string,
}

VideoModal.defaultProps = {
  editor: '',
  description: null,
  onClose: null,
  title: '',
  vimeoId: '',
}

export default VideoModal
