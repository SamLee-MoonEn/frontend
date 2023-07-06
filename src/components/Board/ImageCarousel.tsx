import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";
import tw from "twin.macro";

interface ImageListData {
  readonly imgList: { id: number; postImage: string }[];
}

const CarouselContainer = styled.div`
  .carousel .control-arrow:hover {
    background-color: transparent !important;
  }
  .carousel .control-dots .dot {
    box-shadow: none;
  }
  .carousel.carousel-slider {
    height: 350px;
  }
  /* ${tw`h-[350px] overflow-hidden`}; */
`;

const ImageCarousel = ({ imgList }: ImageListData) => {
  return (
    <CarouselContainer>
      <Carousel
        className=""
        useKeyboardArrows
        showThumbs={false}
        showStatus={false}
      >
        {imgList.map((img, idx) => (
          <img src={img.postImage} key={idx} />
        ))}
      </Carousel>
    </CarouselContainer>
  );
};

export default ImageCarousel;
