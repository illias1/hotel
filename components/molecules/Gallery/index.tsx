import React, { useRef } from "react";
import dynamic from "next/dynamic";
// import SimpleImageSlider from "react-simple-image-slider";

const SimpleImageSlider = dynamic(() => import("react-simple-image-slider"), { ssr: false });

type IGalleryProps = {
  images: { url: string }[];
};

const PhotoGallery: React.FC<IGalleryProps> = ({ images }) => {
  return (
    <SimpleImageSlider
      showBullets={false}
      showNavs={true}
      width="100%"
      height={250}
      images={images}
    />
  );
};

export default PhotoGallery;
