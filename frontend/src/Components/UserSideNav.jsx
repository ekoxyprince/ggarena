import React from "react";
import { Tooltip } from "antd";
import { Images } from "../assets/Images";
import Community from "../constants/Community";
import { IoAddOutline } from "react-icons/io5";
import CustomModal from "./ui/CustomModal";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

function UserSideNav({ user }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const navigate = useNavigate();
  return (
    <div className="bg-[#2e2e2e] w-[60px] md:flex justify-center top-0 left-0 min-h-screen fixed pt-[60px] hidden z-50">
      <div className="pt-4 gap-[10px] overflow-y-auto h-[calc(100vh-60px)] scrollbar-hide pb-[15px]">
        {user?.communities.map((community, index) => {
          return (
            <Link to={`/community/${community._id}`}>
              <Tooltip
                color="black"
                placement="right"
                title={community.name}
                key={index}
                className="mb-[10px]"
              >
                <div className="w-[42px] h-[43px] rounded-md flex items-center justify-center cursor-pointer overflow-hidden">
                  <img
                    src={community.image}
                    className="w-full h-full object-cover object-center"
                    alt=""
                  />
                </div>
              </Tooltip>
            </Link>
          );
        })}
        <CustomModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onOpen={onOpen}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
            hendrerit risus, sed porttitor quam.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
            hendrerit risus, sed porttitor quam.
          </p>
          <p>
            Magna exercitation reprehenderit magna aute tempor cupidatat
            consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
            incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua
            enim laboris do dolor eiusmod. Et mollit incididunt nisi consectetur
            esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
            deserunt nostrud ad veniam.
          </p>
          <Button color="sec" onPress={onClose}>
            Action
          </Button>
        </CustomModal>
        <Button
          isIconOnly
          onPress={() => navigate("/communities")}
          className="w-[44px] bg-[#1f1f1f] h-[44px] rounded-md flex items-center justify-center cursor-pointer overflow-hidden"
        >
          <Tooltip color="black" placement="right" title={"Create Community"}>
            <IoAddOutline className="text-primary" size={20} />
          </Tooltip>
        </Button>
      </div>
    </div>
  );
}

export default UserSideNav;
