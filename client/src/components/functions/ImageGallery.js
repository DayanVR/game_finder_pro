import { Carousel } from "flowbite-react";

export default function ImageGallery({ images, setImageIndex }) {
  return (
    <div className="mx-auto h-56 w-11/12 sm:w-8/12 md:w-8/12 lg:w-8/12 xl:w-6/12 2xl:w-[600px] sm:h-64 lg:h-80 2xl:h-96">
      <Carousel
        onSlideChange={(index) => setImageIndex(index + 1)}
        className=""
        slide={true}
        slideInterval={3000}
        indicators={false}
        pauseOnHover
      >
        {images?.map((image, index) => (
          <div key={index} className="px-1 md:px-2 h-full">
            <img
              src={image.replace("t_thumb", "t_1080p")}
              alt="..."
              className="size-full overflow-hidden "
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
