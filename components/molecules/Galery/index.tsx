import { Carousel, Drawer, Modal } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import Image from "next/image";
import React from "react";
import Gallery from "react-photo-gallery";

import PhotoSlider from "../Slider";
import InitialGallery from "./InitialGallery";

type IGalleryProps = {
  photos: string[];
};
interface IPhoto {
  src: string;
  width: number;
  height: number;
}
const toRequiredPhotoType = (photos: string[]): IPhoto[] => {
  return photos.map((url) => {
    console.log("url", url);
    const ratio = url.split("?")[1].split(":");
    return {
      src: url,
      width: Number(ratio[0]),
      height: Number(ratio[1]),
    };
  });
};

const PhotoGallery: React.FC<IGalleryProps> = ({ photos }) => {
  const screens = useBreakpoint();
  const [isAllImagesMode, setIsAlImagesMode] = React.useState<boolean>(false);

  return screens.md ? (
    <>
      <Drawer
        title="S"
        placement="bottom"
        height="100vh"
        closable={true}
        onClose={() => setIsAlImagesMode(false)}
        visible={isAllImagesMode}
        key="bottom"
      >
        <Gallery columns={2} direction="column" photos={toRequiredPhotoType(photos)} />
      </Drawer>
      <InitialGallery handleShowAllPhotos={() => setIsAlImagesMode(true)} photos={photos} />
    </>
  ) : (
    <PhotoSlider images={photos.map((url) => ({ url }))} />
  );
};

export default PhotoGallery;
