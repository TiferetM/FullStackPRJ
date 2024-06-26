import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

// import image1 from '.../images/image1.jpg';
// import image2 from '.../images/image2.jpg';
// import image3 from '.../images/image3.jpg';
// import image4 from '.../images/image4.jpg';
// import image5 from '.../images/image5.jpg';
const photos = [
  // {
  //   src: image1,
  //   width: 4,
  //   height: 3,
  //   title: 'Beautiful Landscape'
  // },
  // {
  //   src: image2,
  //   width: 1,
  //   height: 1,
  //   title: 'City View'
  // },
  // {
  //   src: image3,
  //   width: 3,
  //   height: 4,
  //   title: 'Mountain Adventure'
  // },
  // {
  //   src: image4,
  //   width: 3,
  //   height: 4,
  //   title: 'Sunny Beach'
  // },
  // {
  //   src: image5,
  //   width: 3,
  //   height: 4,
  //   title: 'Serene Forest'
  // }
];

function Design() {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = (event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const previousImage = () => {
    setCurrentImage((currentImage + photos.length - 1) % photos.length);
  };

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % photos.length);
  };

  return (
    <div>
      <h1>Design</h1>
      <Link to="/new">+</Link>
      <Gallery photos={photos} onClick={openLightbox} />
      {viewerIsOpen && (
        <Lightbox
          mainSrc={photos[currentImage].src}
          nextSrc={photos[(currentImage + 1) % photos.length].src}
          prevSrc={photos[(currentImage + photos.length - 1) % photos.length].src}
          imageTitle={photos[currentImage].title}
          onCloseRequest={closeLightbox}
          onMovePrevRequest={previousImage}
          onMoveNextRequest={nextImage}
        />
      )}
    </div>
  );
}

 export default Design;
