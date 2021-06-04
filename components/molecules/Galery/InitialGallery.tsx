import React from "react";
import styled, { css } from "styled-components";

type IInitialGalleryProps = {
  photos: string[];
  handleShowAllPhotos: () => void;
};

const GalleyContainer = styled.div`
  border-radius: 12px;
  overflow: hidden;
  max-height: calc(-64px + 60vh);
  min-height: 300px;
  position: relative;
  margin: 24px;
`;

const GalleryInnerContainer = styled.div`
  height: 0px;
  min-height: 100%;
  min-width: 100%;
  /* position: relative; */
  padding-top: 50%;
`;

const MainPhoto = styled.div`
  height: 100% !important;
  width: 50% !important;
  left: 0px !important;
  top: 0px !important;
  position: absolute !important;
`;

const SecondColumn = styled.div`
  -moz-box-direction: normal !important;
  -moz-box-orient: vertical !important;
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
  width: 25% !important;
  padding-left: 8px !important;
  left: 50% !important;
  top: 0px !important;
  position: absolute !important;
`;
const ThirdColumn = styled.div`
  -moz-box-direction: normal !important;
  -moz-box-orient: vertical !important;
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
  width: 25% !important;
  padding-left: 8px !important;
  right: 0px !important;
  top: 0px !important;
  position: absolute !important;
`;

const StyledMainImg = styled.img`
  height: 100% !important;
  width: 100% !important;
  max-height: calc(-144px + 100vh) !important;
  min-height: 300px !important;
  object-fit: cover;
`;

const StyledSecondaryImage = styled.img<{ bottom?: boolean }>`
  height: 50%;
  object-fit: cover;
  ${({ bottom }) =>
    bottom
      ? css`
          padding-top: 8px;
        `
      : css`
          padding: 0;
        `};
`;

const ShowAllPhotosButton = styled.button`
  position: absolute;
  z-index: 3;
  bottom: 24px;
  right: 24px;
`;

const InitialGallery: React.FC<IInitialGalleryProps> = ({ photos, handleShowAllPhotos }) => {
  return (
    <GalleyContainer>
      <GalleryInnerContainer>
        <MainPhoto>
          <StyledMainImg src={photos[0]} alt="" />
        </MainPhoto>
        <SecondColumn>
          <StyledSecondaryImage src={photos[1]} alt="" />
          <StyledSecondaryImage bottom src={photos[2]} alt="" />
        </SecondColumn>
        <ThirdColumn>
          <StyledSecondaryImage src={photos[3]} alt="" />
          <StyledSecondaryImage bottom src={photos[4]} alt="" />
        </ThirdColumn>
      </GalleryInnerContainer>
      <ShowAllPhotosButton onClick={handleShowAllPhotos}>Show all photos</ShowAllPhotosButton>
    </GalleyContainer>
  );
};

export default InitialGallery;
