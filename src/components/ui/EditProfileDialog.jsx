import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useForm, FormProvider } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/shared/avatar";
import { Loader2, PenSquare, Upload } from "lucide-react";
import { useAuth } from "../../hooks";
import Inputs from "@/components/shared/Inputs";

const EditProfileDialog = () => {
  const { user, setUser, uploadPicture, updateUser } = useAuth();
  const uploadRef = useRef(null);

  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= FORM ================= */
  const methods = useForm({
    defaultValues: {
      name: user?.name || "",
      password: "",
      confirm_password: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  /* ================= IMAGE ================= */
  const handleImageClick = () => {
    uploadRef.current.click();
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) setPicture(file);
  };

  /* ================= SUBMIT ================= */
  const onSubmit = async (data) => {
    setLoading(true);

    const { name, password, confirm_password } = data;

    // Validation
    if (!name.trim()) {
      setLoading(false);
      return toast.error("Name can't be empty");
    }

    if (password && password !== confirm_password) {
      setLoading(false);
      return toast.error("Passwords don't match");
    }

    try {
      let pictureUrl = "";

      if (picture) {
        pictureUrl = await uploadPicture(picture);
      }

      const userDetails = {
        name,
        password,
        picture: pictureUrl,
      };

      const res = await updateUser(userDetails);

      if (res.success) {
        setUser(res.user);
        toast.success("Updated successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-600">
          <PenSquare className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        {/* ================= AVATAR ================= */}
        <div className="flex justify-center">
          <div className="relative h-40 w-40 cursor-pointer overflow-hidden rounded-full bg-gray-200">
            <div
              className="absolute flex h-full w-full items-center justify-center bg-gray-200 hover:z-10"
              onClick={handleImageClick}
            >
              <input
                type="file"
                className="hidden"
                ref={uploadRef}
                onChange={handlePictureChange}
              />
              <Upload height={50} width={50} color="#4e4646" />
            </div>

            <Avatar>
              <AvatarImage
                src={
                  picture
                    ? URL.createObjectURL(picture)
                    : user?.picture
                }
              />
            </Avatar>
          </div>
        </div>

        {/* ================= FORM ================= */}
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <Inputs
              name="name"
              label="Name :"
              type="name"
              errors={errors.name}
            />

            <Inputs
              name="password"
              label="New Password :"
              type="password"
              errors={errors.password}
            />

            <Inputs
              name="confirm_password"
              label="Confirm Password :"
              type="password"
              errors={errors.confirm_password}
            />

            <DialogFooter>
              <Button
                disabled={loading}
                type="submit"
                className="w-full"
              >
                {loading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
