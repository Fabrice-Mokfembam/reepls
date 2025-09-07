import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Camera, Loader2 } from "lucide-react";
import { Pics } from "../../../assets/images";
import { RightBar } from "../../../components/RightBar";
import ProfileConfigurations from "../components/ProfileConfigurations";
import { MainContent } from "../../../components/MainContent";
import Topbar from "../../../components/Topbar";
import { useGetUserByUsername, useUpdateUser, useUpdateUser2 } from "../hooks/useProfile";
import { toast } from "react-toastify";
import { updateUsernameInSecureStorage } from "../../Auth/utils";
import ProfileEditSkeleton from "../components/ProfileEditSkeleton";
import { uploadUserBanner, uploadUserProfile } from "../../../utils/media";
import { useCurrentUser } from "../../Auth/hooks/useCurrentUser";


const EditProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { user, isLoading } = useGetUserByUsername(username || '');
  const { mutate, isPending, error, isSuccess, isError } = useUpdateUser();
  const { mutate:update } = useUpdateUser2();
  const navigate = useNavigate();

  const {user:authUser} = useCurrentUser()

  const [name, setName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState(Pics.banner);
  const [profileImage, setProfileImage] = useState(Pics.profile);

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setUserName(user.username || '');
      setBio(user.bio || '');
      setAbout(user.about || '');
      setLocation(user.address || '');
      setBannerImage(user.banner_picture || Pics.banner);
      setProfileImage(user.profile_picture || Pics.profile);
    }
  }, [user]);

  const handleBannerClick = () => bannerInputRef.current?.click();
  const handleProfileClick = () => profileInputRef.current?.click();

   const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setBannerImage(e.target?.result as string);
      reader.readAsDataURL(file);
      submitBannerImage(file)
        .then((data) => {
          update({banner_picture:data})
          toast.success('sucessfullu uploaded bannerimage');
        })
        .catch(() => {
          toast.error('Failed uploading banner image');
        });
    }
  };

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target?.result as string);
      reader.readAsDataURL(file);
      submitProfileImage(file)
        .then((data) => {
          update({profile_picture:data})
          toast.success('sucessfully uploaded profile image');
          
        })
        .catch(() => {
          toast.error('Failed uploading profile image');
        });
    }
  };

  const submitBannerImage = async (file: File) => {
    if (!authUser?.id) {
      toast.error('Login to update the banner');
      return;
    }
    const url = await uploadUserBanner(file);
    setBannerImage(url);
    return url;
  };

  const submitProfileImage = async (file: File) => {
    if (!authUser?.id) {
      toast.error("Login to update profile image");
      return;
    }
    const url = await uploadUserProfile( file);
    setProfileImage(url);
    return url;
  };

  const handleSave = () => {
    if (isPending) return;
    const values = { name, about, bio, username: userName, address: location };
    mutate(values);
  };

  useEffect(() => {
    if (isSuccess) {
      const updateSuccess = updateUsernameInSecureStorage(userName);
      if (!updateSuccess) {
        console.error("Failed to update username in secure storage");
      }
      toast.success('Profile updated successfully');
      navigate(`/profile/${userName}`);
    }
    if (isError) {
      toast.error(`Failed to update profile: ${error?.message}`);
    }
  }, [isSuccess, isError, error, navigate, userName]);

  const inputWrapperClass = (fieldId: string) =>
    `mb-4 bg-neutral-700 p-2 rounded-md ${
      focusedField === fieldId ? "border-2 border-primary-500" : ""
    }`;

  const inputClass =
    "w-full h-12 px-2 text-sm text-neutral-50 bg-neutral-700 focus:outline-none rounded";
  const textareaClass =
    "w-full px-2 py-2 text-sm text-neutral-50 bg-neutral-700 focus:outline-none rounded resize-none";

  if (isLoading) return <ProfileEditSkeleton isLoading />;

  if (!user) {
    return (
      <div className="max-w-3xl m-auto p-4 text-center text-neutral-100">
        <p className="mb-4 text-lg">User not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-primary-400 rounded-full hover:bg-primary-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="lg:grid grid-cols-[4fr_1.65fr]">
      <MainContent>
        <Topbar>
          <div className="px-2 text-neutral-100">Edit Profile</div>
        </Topbar>
        <div className="max-w-3xl m-auto">
          <div className="w-full relative mb-20">
            {/* Banner image */}
            <div
              className="w-full h-36 overflow-hidden bg-neutral-200 flex items-center justify-center relative cursor-pointer"
              onClick={handleBannerClick}
            >
              <img
                src={bannerImage}
                alt="Banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 md:opacity-0 hover:opacity-50 transition-opacity duration-300">
                <Camera size={32} color="white" />
              </div>
              <input
                type="file"
                accept="image/*"
                ref={bannerInputRef}
                onChange={handleBannerChange}
                className="hidden"
              />
            </div>

            {/* Profile image */}
            <div
              className="size-34 rounded-full bg-primary-300 absolute left-[4%] -bottom-[50%] overflow-hidden border-4 border-white shadow-none flex items-center justify-center cursor-pointer"
              onClick={handleProfileClick}
            >
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 md:opacity-0 hover:opacity-100 transition-opacity duration-300">
                <Camera size={32} color="white" />
              </div>
              <input
                type="file"
                accept="image/*"
                ref={profileInputRef}
                onChange={handleProfileChange}
                className="hidden"
              />
            </div>
          </div>
          <div className="mt-24 p-4">
            <div className={inputWrapperClass("name")}>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-100">
                Name
              </label>
              <input
                id="name"
                type="text"
                className={inputClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
              />
            </div>
            <div className={inputWrapperClass("username")}>
              <label htmlFor="username" className="block text-sm font-medium text-neutral-100">
                Username
              </label>
              <input
                id="username"
                type="text"
                className={inputClass}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onFocus={() => setFocusedField("username")}
                onBlur={() => setFocusedField(null)}
              />
            </div>
            <div className={inputWrapperClass("bio")}>
              <label htmlFor="bio" className="block text-sm font-medium text-neutral-100">
                Bio
              </label>
              <input
                id="bio"
                className={inputClass}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                onFocus={() => setFocusedField("bio")}
                onBlur={() => setFocusedField(null)}
              />
            </div>
            <div className={inputWrapperClass("about")}>
              <label htmlFor="about" className="block text-sm font-medium text-neutral-100">
                About
              </label>
              <textarea
                id="about"
                rows={3}
                className={textareaClass}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                onFocus={() => setFocusedField("about")}
                onBlur={() => setFocusedField(null)}
              />
            </div>
            <div className={inputWrapperClass("location")}>
              <label htmlFor="location" className="block text-sm font-medium text-neutral-100">
                Location
              </label>
              <input
                id="location"
                type="text"
                className={inputClass}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={() => setFocusedField("location")}
                onBlur={() => setFocusedField(null)}
              />
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="px-6 py-3 bg-primary-400 text-white rounded-full hover:bg-primary-600 transition-colors flex items-center gap-2"
                onClick={handleSave}
                disabled={isPending}
              >
                {isPending ? <Loader2 className="animate-spin" size={18} /> : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </MainContent>
      <RightBar>
        <ProfileConfigurations />
      </RightBar>
    </div>
  );
};

export default EditProfile;
