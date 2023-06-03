import React, { useState } from "react";
import Modal from "react-modal";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ArrowDownCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface Content {
  type: string;
  content: string;
}

interface Props {
  contents: Content[];
}

const GalleryComponent: React.FC<Props> = ({ contents }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSlide = (currentIndex: number) => {
    setSelectedImageIndex(currentIndex);
  };

  const images = contents
    .filter((content) => content.type === "GALLERY")
    .map((content) => ({
      original: content.content,
      thumbnail: content.content,
    }));

  const handleDownloadImage = (imageUrl: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "image.jpg";
    link.target = "_blank";
    link.click();
  };

  return (
    <div>
      <ImageGallery
        items={images}
        showThumbnails={images.length > 1}
        showPlayButton={false}
        showFullscreenButton={false}
        onSlide={handleSlide}
        onClick={openModal}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        ariaHideApp={false}
        className="modal"
        shouldCloseOnOverlayClick={true}
        overlayClassName="overlay"
      >
        <div className="modal-close" onClick={closeModal}>
          <XMarkIcon className="h-7  w-7" />
        </div>
        {images.length > 0 && (
          <div className="modal-image-wrapper">
            <img src={images[selectedImageIndex].original} alt="" />
          </div>
        )}
        <button
          className="modal-download px-2"
          onClick={() => handleDownloadImage(images[selectedImageIndex].original)}
        >
          <ArrowDownCircleIcon className="h-7 w-7 modal-download-ico" />
           
        </button>
      </Modal>
    </div>
  );
};

export default GalleryComponent;
