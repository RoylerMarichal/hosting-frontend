import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CURRENT_USER_FULL, UPDATE_USER } from "../../utils/queries";
import { toast } from "react-toastify";
import defaults from "../../utils/defaults";
import yourhandle from "countrycitystatejson";
import { CountryType } from "../../types/Types";
import ImageUploading from "react-images-uploading";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../../redux/authSlice";
import { useTranslation } from "react-i18next";
import { Resolver, useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
  username: string;
  avatar: string;
  cover: string;
  avatar_thumbnail: string;
  phone: string;
  resume: string;
  country: string;
  state: string;
  city: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.email ? values : {}, // if email is not empty, return values
    errors: !values.email
      ? {
          email: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};
type Image = {
  data_url: string;
  // Otros campos si los hay
};
const SettingProfilePage = () => {
  const { t } = useTranslation("settings");

  const [images, setImages] = useState([]);
  const [imagesCover, setImagesCover] = useState([]);
  const maxNumber = 1;

  const onChangeAvatar = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const onChangeCover = (imageList, addUpdateIndex) => {
    setImagesCover(imageList);
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const { data: user, refetch } = useQuery(GET_CURRENT_USER_FULL);
  const [mode, setMode] = useState("view");
  const [avatar, setAvatar] = useState("");
  const [avatarProgress, setAvatarProgress] = useState(0);
  const [avatarTmb, setAvatarTmb] = useState("");
  const [cover, setCover] = useState("");
  const [coverProgress, setCoverProgress] = useState(0);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    let countries = yourhandle.getCountries();
    setCountries(countries);
  }, []);

  useEffect(() => {
    let states = yourhandle.getStatesByShort(watch("country"));
    setStates(states);
  }, [watch("country")]);

  useEffect(() => {
    let cities = yourhandle.getCities(watch("country"), watch("state"));
    setCities(cities);
  }, [watch("state")]);

  const onErrorUploadingFiles = (error: any) => {
    console.log(error.message);

    toast.error(error.message);
  };

  const onSuccessCover = (res: any) => {
    setCover(res.url);
    setCoverProgress(2);
  };

  const [tabs, setTabs] = useState([
    { name: t("general"), key: "general", href: "#", current: true },
   // { name: t("language"), key: "language", href: "#", current: false },
    // { name: "Notifications", href: "#", current: false },
    // { name: "Plan", href: "#", current: false },
    // { name: "Billing", href: "#", current: false },
  ]);
  const dispatch = useDispatch();

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  const [
    updateUser,
    { loading: LoadingUpdate, data: DataUpdate, error: ErrorRegister },
  ] = useMutation(UPDATE_USER, {
    onCompleted(data, clientOptions) {
      toast.success("Perfil actualizado");
      refetch();
      setMode("view");
      let payload = {
        id: data.updateUser.id,
        username: data.updateUser.username,
        email: data.updateUser.email,
        avatar: data.updateUser.avatar,
      };

      console.log(payload);

      dispatch(updateUserInfo(payload));
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmitUpdate = handleSubmit((data, event) => {
    event?.preventDefault();
    let payload = {
      email: data.email,
      password: data.password,
      username: data.username,
      avatar: images.length > 0 ? (images[0] as Image)?.data_url : undefined,
      cover:
        imagesCover.length > 0
          ? (imagesCover[0] as Image)?.data_url
          : undefined,
      avatar_thumbnail: avatarTmb ?? defaults.avatar_thumbnail,
      phone: data.phone ?? defaults.phone,
      resume: data.resume,
      country: data.country,
      state: data.state,
      city: data.city,
    };

    updateUser({
      variables: payload,
    });
  });

  useEffect(() => {
    if (user) {
      setValue("email", user?.me?.email);
      setValue("username", user?.me?.username);
      setValue("resume", user?.me?.resume);
      setAvatar(user?.me?.avatar);
      setAvatarTmb(user?.me?.avatar_thumbnail);
      setCover(user?.me?.cover);
      setValue("phone", user?.me?.phone);
    }
  }, [user]);

  return (
    <div>
      <div className="block">
        <div className=" flex flex-wrap px-3">
          <div className="border-b flex flex-col border-gray-200">
            <nav
              className=" text-center mt-3 flex mx-auto space-x-8"
              aria-label="Tabs"
            >
              {tabs.map((tab, index) => (
                <button
                  key={tab.name}
                  onClick={(e) => {
                    let tabs2 = [...tabs];
                    tabs2.map((tab) => (tab.current = false));
                    tabs2[index].current = true;

                    setTabs(tabs2);
                  }}
                  className={classNames(
                    tab.current
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                  )}
                  aria-current={tab.current ? "page" : undefined}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {tabs.map((tab) => {
        if (tab.current) {
          if (tab.key === "general") {
            return (
              <div key={tab.name}>
                {mode === "view" ? (
                  <div>
                    <div className="pb-16">
                      <div className="px-4 sm:px-6 md:px-0">
                        <div className="py-2">
                          {/* Description list with inline editing */}
                          <div className="mt-1 divide-y divide-gray-200">
                            <div className="space-y-1 flex justify-between">
                              <div className="flex flex-col">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                  {t("profile")}
                                </h3>
                                <p className="max-w-2xl text-sm text-gray-500">
                                  {t("profile_info_1")}
                                  <br />
                                  {t("profile_info_2")}
                                </p>
                              </div>
                              <button
                                onClick={() => {
                                  setMode("edit");
                                }}
                                type="button"
                                className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                              >
                                {t("update")}
                              </button>
                            </div>
                            <div className="mt-6">
                              <dl className="divide-y divide-gray-200">
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    {t("name")}
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">
                                      {" "}
                                      {user?.me?.username}
                                    </span>
                                  </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    {t("about")}
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">
                                      {" "}
                                      {user?.me?.resume ?? "---"}
                                    </span>
                                  </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    {t("avatar")}
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">
                                      <img
                                        className="h-8 w-8 rounded-full"
                                        src={
                                          user?.me?.avatar ??
                                          "/assets/img/avatar.png"
                                        }
                                        alt=""
                                      />
                                    </span>
                                  </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    {t("email")}
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">
                                      {user?.me?.email}
                                    </span>
                                  </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    {t("phone")}
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">
                                      {user?.me?.phone}
                                    </span>
                                  </dd>
                                </div>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mx-auto mb-10 flex max-w-4xl flex-col md:px-8 xl:px-0">
                    <div className="   mt-3 mb-3">
                      <div className="flex items-start justify-start">
                        <div className="  flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md flex space-x-3 my-2 bg-white main-color hover:text-gray-500 focus:outline-none focus:outline-none  "
                            onClick={() => setMode("view")}
                          >
                            <span className="sr-only">Close panel</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="icon"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                              />
                            </svg>
                            <span className="title">
                              {" "}
                              {t("return_to_setting")}{" "}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <form className="space-y-3  p-3">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {t("email")}
                        </label>
                        <div className="mt-1  ">
                          <input
                            id="email"
                            disabled={true}
                            {...register("email")}
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          />
                          {errors?.email && <p>{errors.email.message}</p>}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {t("new_password")}
                        </label>
                        <div className="mt-1 my-2">
                          <input
                            id="password"
                            type="password"
                            {...register("password")}
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="resume"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {t("abaut")}
                        </label>
                        <div className="mt-1  ">
                          <textarea
                            id="resume"
                            {...register("resume")}
                            name="resume"
                            autoComplete="resume"
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          />
                          {errors?.resume && <p>{errors.resume.message}</p>}
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {t("phone")}
                        </label>
                        <div className="mt-1  ">
                          <input
                            id="phone"
                            {...register("phone")}
                            name="phone"
                            type="phone"
                            autoComplete="phone"
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          />
                          {errors?.phone && <p>{errors.phone.message}</p>}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="username"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {t("username")}
                        </label>
                        <div className="mt-1  ">
                          <input
                            id="username"
                            {...register("username")}
                            name="username"
                            type="username"
                            autoComplete="username"
                            required
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          />
                          {errors?.username && <p>{errors.username.message}</p>}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="username"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {t("country")}
                        </label>
                        <div className="mt-1  ">
                          <select
                            id="country"
                            {...register("country")}
                            name="country"
                            className="input-text"
                          >
                            <option value="">- {t("select_country")} -</option>
                            {countries?.map((country: CountryType) => (
                              <option
                                key={country.shortName}
                                value={country.shortName}
                              >
                                {country.name}
                              </option>
                            ))}
                          </select>
                          {errors?.username && <p>{errors.username.message}</p>}
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {t("state")}
                        </label>
                        <div className="mt-1  ">
                          <select
                            id="state"
                            {...register("state")}
                            name="state"
                            className="input-text"
                          >
                            <option value="">-{t("select_state")} -</option>
                            {states?.map((state: string) => (
                              <option key={state} value={state}>
                                {state}
                              </option>
                            ))}
                          </select>
                          {errors?.state && <p>{errors.state.message}</p>}
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {t("city")}
                        </label>
                        <div className="mt-1  ">
                          <select
                            id="city"
                            {...register("city")}
                            name="city"
                            className="input-text"
                          >
                            <option value="">- {t("select_city")} -</option>
                            {cities?.map((city: string) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                          {errors?.city && <p>{errors.city.message}</p>}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="avatar"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {t("avatar")}
                        </label>
                        <div className="mt-1 flex space-x-2 ">
                          <ImageUploading
                            value={images}
                            onChange={onChangeAvatar}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                          >
                            {({
                              imageList: imageListAvatar,
                              onImageUpload: onImageUploadAvatar,
                              onImageRemoveAll: onImageRemoveAllAvatar,
                              onImageUpdate,
                              onImageRemove,
                              isDragging,
                              dragProps: dragPropsAvatar,
                            }) => (
                              // write your building UI
                              <div className="upload__image-wrapper">
                                <div className="col-span-full">
                                  <div className="mt-2 flex items-center gap-x-3">
                                    <div onClick={onImageRemoveAllAvatar}>
                                      {!imageListAvatar[0] ? (
                                        <div className="flex items-center space-x-3">
                                          <UserCircleIcon
                                            className="h-12 w-12 text-gray-300"
                                            aria-hidden="true"
                                          />
                                          <button
                                            onClick={(e) => {
                                              e.preventDefault();
                                              onImageUploadAvatar();
                                            }}
                                            {...dragPropsAvatar}
                                            type="button"
                                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                          >
                                            {t("change")}
                                          </button>
                                        </div>
                                      ) : (
                                        imageListAvatar.map((image, index) => (
                                          <div
                                            key={index}
                                            className="image-item"
                                          >
                                            <img
                                              src={image["data_url"] ?? ""}
                                              className="h-12 w-12 rounded-full"
                                            />
                                          </div>
                                        ))
                                      )}
                                    </div>
                                  </div>
                                </div>
                                &nbsp;
                              </div>
                            )}
                          </ImageUploading>
                        </div>
                      </div>
                      <ImageUploading
                        value={imagesCover}
                        onChange={onChangeCover}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                      >
                        {({
                          imageList: imageListCover,
                          onImageUpload: uploadCover,
                          onImageRemoveAll: onImageRemoveAllCover,
                          onImageUpdate,
                          onImageRemove,
                          isDragging,
                          dragProps,
                        }) => (
                          <div className="col-span-full">
                            <label
                              htmlFor="cover-photo"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              {t("cover")}
                            </label>

                            {!imageListCover[0] ? (
                              <div
                                onClick={onImageRemoveAllCover}
                                className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                              >
                                <div
                                  onClick={(e) => {
                                    e.preventDefault();
                                    uploadCover();
                                  }}
                                  {...dragProps}
                                  className="text-center"
                                >
                                  <PhotoIcon
                                    className="mx-auto h-12 w-12 text-gray-300"
                                    aria-hidden="true"
                                  />
                                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                      htmlFor="file-upload"
                                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                      <span>{t("upload_file")}</span>
                                      <input
                                        id="file-upload"
                                        name="file-upload"
                                        type="file"
                                        className="sr-only"
                                      />
                                    </label>
                                  </div>
                                  <p className="text-xs leading-5 text-gray-600">
                                    PNG, JPG, GIF up to 10MB
                                  </p>
                                </div>
                              </div>
                            ) : (
                              imageListCover.map((image, index) => (
                                <div
                                  onClick={onImageRemoveAllCover}
                                  key={index}
                                  className="image-item"
                                >
                                  <img
                                    src={image["data_url"] ?? ""}
                                    className="w-full h-48 object-cover"
                                  />
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </ImageUploading>

                      {/* 
                              <div>
                                <label
                                  htmlFor="username"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Cover
                                </label>
                                <div className="mt-1 flex space-x-2 ">
                                  <IKContext
                                    publicKey="public_y8F60KW3dcPoPRWjJihL9GaRWwA="
                                    urlEndpoint="https://ik.imagekit.io/cluzstudio"
                                    // transformationPosition="path"
                                    authenticationEndpoint={serverImageKitAuth}
                                  >
                                    <IKUpload
                                      onError={onErrorUploadingFiles}
                                      folder={"/creo_red/avatars"}
                                      fileName={"avatars"}
                                      onSuccess={onSuccessCover}
                                      onUploadProgress={onUploadProgressCover}
                                    />
                                  </IKContext>
                                  {coverProgress === 2 && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 text-green-800"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                  )}
                                  {coverProgress === 1 && <Loading />}
                                </div>
                              </div> */}

                      <div className="mt-3 flex pb-10 space-x-3">
                        {avatarProgress === 1 || coverProgress === 1 ? (
                          <button className="btn-update">
                            Actualizar
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              onSubmitUpdate();
                            }}
                            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Actualizar
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setMode("view");
                          }}
                          className="flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            );
          }
          
        }
      })}
    </div>
  );
};

export default SettingProfilePage;
