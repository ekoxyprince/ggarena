import React from "react";
import { Images } from "../../assets/Images";
import IconBtn from "../../Components/IconBtn";
import useMutate from "../../hooks/useMutate";
import toast from "react-hot-toast";
import { useOutletContext } from "react-router-dom";

function Settings({ user }) {
  const { mutateAsync } = useMutate(
    "/api/user/details",
    ["update@profile"],
    "patch"
  );
  const { refetchUser } = useOutletContext();
  async function onSubmit() {
    if (Object.values(form).includes("")) {
      return toast.error("all fields must be provided");
    }
    await mutateAsync(form, {
      onSettled: (data) => {
        refetchUser();
      },
    });
  }
  const [form, setForm] = React.useState({
    fullname: user?.fullname,
    email: user?.email,
    password: undefined,
  });
  function updateForm(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }
  React.useEffect(() => {}, [user]);
  return (
    <div className="flex flex-col space-y-3">
      <h2 className="text-[32px] font-[700]">Update Details</h2>
      <div className="flex flex-col gap-[15px]">
        <input
          type="text"
          placeholder="Email"
          className="w-full bg-[#292929] border-t-[2px] border-b-[2px] border-[#474747] h-[45px] outline-0 px-[20px] font-syne"
          name="email"
          value={form.email}
          readOnly
        />
        <input
          type="text"
          placeholder="Fullname"
          name="fullname"
          value={form.fullname}
          onChange={updateForm}
          className="w-full bg-[#292929] border-t-[2px] border-b-[2px] border-[#474747] h-[45px] outline-0 px-[20px] font-syne"
        />
        <input
          type="Password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={updateForm}
          className="w-full bg-[#292929] border-t-[2px] border-b-[2px] border-[#474747] h-[45px] outline-0 px-[20px] font-syne"
        />
      </div>
      <button
        type="button"
        onClick={onSubmit}
        style={{ alignSelf: "flex-end" }}
        className="w-[150px] py-[13px] px-[20px] bg-primary text-secondary text-[15px] font-bold font-Mont mt-[30px] relative"
      >
        <img
          src={Images.blackBorder2}
          className="w-[40px] rotate-90 absolute left-[-2px] top-[50%] translate-y-[-50%]"
          alt=""
        />
        UPDATE
        <img
          src={Images.blackBorder2}
          className="w-[40px] -rotate-90 absolute right-[-2px] top-[50%] translate-y-[-50%]"
          alt=""
        />
      </button>
    </div>
  );
}

export default Settings;
