import React from "react";
import { Tooltip } from "antd";
import { FaCamera } from "react-icons/fa6";
import { Images } from "../../assets/Images";
import useMutate from "../../hooks/useMutate";

function ProfileImgUploader({ refetch, user }) {
  const [images, setImage] = React.useState([]);
  const { mutateAsync } = useMutate(
    `/api/user/picture`,
    [`update@picture`],
    "patch",
    { "Content-Type": "multipart-formdata" }
  );
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      await mutateAsync(formData, {
        onSettled: (data) => {
          refetch();
        },
      });
    }
  };
  return (
    <div className="">
      <div className="relative h-fit mb-4">
        <div className="profile-img overflow-hidden rounded-full w-[140px] h-[140px]">
          <img
            className=" w-full h-full object-cover object-center"
            src={images.length > 0 ? images : user?.profilePic}
            alt=""
          />
        </div>
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

export default ProfileImgUploader;
