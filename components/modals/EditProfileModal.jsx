import { useCallback, useEffect, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useEditProfileModal from "@/hooks/useEditProfileModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { toast } from "react-hot-toast";
import axios from "axios";

import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import ImageUpload from "../ImageUpload";

const EditProfileModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editProfileModal = useEditProfileModal();

  //states
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleChange = (event) => {
    setIsPrivate(!isPrivate);
  };

  const labelStyle = {
    color: "#FFFFFF", // Replace with the desired text color
  };

  //initialize all of the existing fields
  useEffect(() => {
    setProfileImage(currentUser?.profileImage || "");
    setUsername(currentUser?.username);
    setBio(currentUser?.bio || "");
    setIsPrivate(currentUser?.isPrivate);
  }, [currentUser]);

  //loading state
  const [isLoading, setIsLoading] = useState(false);

  //on submit function
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.patch("/api/edit", {
        username,
        bio,
        profileImage,
        isPrivate,
      });
      mutateFetchedUser();
      toast.success("Successfully updated");
      editProfileModal.onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setIsLoading(false);
  }, [
    editProfileModal,
    bio,
    username,
    profileImage,
    isPrivate,
    mutateFetchedUser,
  ]);

  const bodyOfModal = (
    <div className="flex flex-col gap-4 items-center">
      <div className="w-full">
        <ImageUpload
          value={profileImage}
          disabled={isLoading}
          onChange={(image) => setProfileImage(image)}
          label="Upload new profile image"
        />
      </div>

      <div className="w-full">
        <p className="text-white font-bold">Username Settings</p>
        <Input
          placeholder="Username"
          value={username}
          disabled={isLoading}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="w-full">
        <p className="text-white font-bold">Bio Settings</p>
        <Input
          placeholder="Bio"
          value={bio}
          disabled={isLoading}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <div className="flex w-full flex-col">
        <p className="text-white font-bold">Privacy Settings</p>
        <FormControlLabel
          control={
            <Switch
              checked={isPrivate ? false : true}
              onChange={handleChange}
            />
          }
          label={isPrivate ? "Private" : "Public"}
          labelPlacement="end"
          style={labelStyle}
        />
      </div>
    </div>
  );

  return (
    <>
      <Modal
        body={bodyOfModal}
        disabled={isLoading}
        isOpen={editProfileModal.isOpen}
        title="Edit your profile"
        submitBtnLabel="Save changes"
        onClose={editProfileModal.onClose}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default EditProfileModal;
