import React from "react";
import { FaCamera } from "react-icons/fa6";
import { Images } from "../../assets/Images";

function BannerImgUpload({ showUpdate = true }) {
  const clickedRef = React.useRef(null);
  const fileClicked = () => {
    clickedRef.current.click();
  };
  const [images, setImage] = React.useState([]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div
        className={` bg-cover bg-no-repeat bg-center h-[350px] relative overflow-hidden img-bg`}
        style={{
          backgroundImage: `linear-gradient(transparent, #1F1F1F), url(${
            images.length > 0 ? images : Images.banner1
          })`,
        }}
      >
        {showUpdate && (
          <button
            onClick={fileClicked}
            className="flex items-center gap-2 z-10 absolute bg-[#2e2e2e] px-[20px] h-[38px] rounded-lg right-[30px] top-[30px]"
          >
            <FaCamera /> Upload Banner
          </button>
        )}
      </div>
      <input
        type="file"
        id="bannerInput"
        accept="image/*"
        ref={clickedRef}
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
}

export default BannerImgUpload;
