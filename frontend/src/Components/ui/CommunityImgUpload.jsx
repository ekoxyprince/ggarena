import React from "react";
import { Tooltip } from "antd";
import { FaCamera } from "react-icons/fa6";
import { Images } from "../../assets/Images";
import comIC1 from "../../assets/Images/comIC.webp";
import useMutate from "../../hooks/useMutate";
import { useParams } from "react-router-dom";

function CommunityImgUpload({ img, isAdmin, isJoined }) {
  const params = useParams("id");
  const { id } = params;
  const [images, setImage] = React.useState([]);
  const { mutateAsync } = useMutate(
    `/api/communities/${id}`,
    [`update@${id}`],
    "patch",
    { "Content-Type": "multipart-formdata" }
  );
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", "image");
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      await mutateAsync(formData, {
        onSettled: (data) => {},
      });
    }
  };
  return (
    <div className="">
      <div className="relative h-fit mb-4">
        <div className="profile-img overflow-hidden rounded-full w-[140px] h-[140px]">
          <img
            className=" w-full h-full object-cover object-center"
            src={images.length > 0 ? images : img}
            alt=""
          />
        </div>
        {isAdmin && isJoined ? (
          <Tooltip
            color="black"
            placement="right"
            title={"Upload Profile Picture"}
            className="absolute bottom-1 -right-1"
          >
            <label
              htmlFor="fileInput"
              className="w-[38px] h-[38px] bg-[#364259] rounded-full flex items-center justify-center cursor-pointer overflow-hidden"
            >
              <FaCamera />
            </label>
          </Tooltip>
        ) : (
          ""
        )}
      </div>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
}

export default CommunityImgUpload;
