import { Fragment, RefObject, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useMutation, gql } from "@apollo/client";
import "react-loading-skeleton/dist/skeleton.css";
import { CREATE_PUBLICATION } from "../../../utils/queries";
import { toast } from "react-toastify";
import defaults from "../../../utils/defaults";
import Loading from '../../commons/Loading';
import {
  PostType,
  PublicationContent,
  PublicationType,
} from "../../../types/Types";
import NewStatus from "./NewStatus";

const AddPublication = (props: { avatar: string; username: string }) => {
  //DataSet Initial
  const postTypes: PostType[] = defaults.postTypes;
  const [typeBtn, setBtnType] = useState(postTypes);

  //New Content
  const [contentText, setContentText] = useState("");
  const [textareaIsFocused, setIsFocused] = useState(false);
  //Images
  const [contentImages, setContentImages] = useState<string[]>([]);
  const [images, setImages] = useState([]);

  //Reaction
  const [selectedReactionMod, setSelectedReaction] = useState(
    defaults.moods[0]
  );

  //------------------------------------------------
  //Payload for publication
  const [contents, setContents] = useState<PublicationContent[]>();
  //------------------------------------------------

  // const maxNumber = 69;

  const [savePost, {loading}] = useMutation(CREATE_PUBLICATION, {
    onCompleted: ({ post }) => {
      reset();
  
      toast.success("Contenido publicado");
    },
    onError: (error) => {
      console.log(error);

  
      toast.error(error.message);
    },
  });

  const reset = () => {
    setContentText("");
    setContentImages([]);
    setImages([]);
  };


  const handleSendDataToBd = (data:any) => {
    
    const currentPostType = postTypes.find((type) => type.current === true);

    const payload = {
      contents: data,
      type: currentPostType?.key ?? "STATUS",
      reaction: selectedReactionMod.name,
    };

    savePost({
      variables: payload,
    });
  };

  const validatePublication = (currentPostType: string) => {
    if (currentPostType === "STATUS") {
      if (contentText === "" && images.length === 0) {
        toast.error("You must write something or upload an image");
        return;
      }
    }
  };

  const handleSavePost = async () => {
    const currentPostType =
      postTypes.find((type) => type.current === true) ?? postTypes[0];
    validatePublication(currentPostType?.key);

    if (currentPostType.key === "STATUS") {
      const processedText = contentText
        .replace(/\n/g, "<br>")

      let initialData: PublicationContent[] = [{
        content: processedText,
        type: "TEXT",
      }];

     
      if (images.length > 0) {
        
        images.map((image:any) => {
          let data = {
            content: image.dataURL,
            type: "GALLERY",
          };
        
          initialData.push(data);
        });
      }

       
      handleSendDataToBd(initialData);
    }

  };

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const handleTextAreaChange = (text: any) => {
    setContentText(text);
  };
  const handleSelectedReaction = (text: any) => {
    setSelectedReaction(text);
  };
  const handleUploadingImage = (image: any) => {
    setImages(image);
  };
  const handleTextareaFocus = () => {
    setIsFocused(true);
  };

  const handleTextareaBlur = () => {
    setIsFocused(false);
  };
  return (
    <>
      <div className="block gap-3 my-5">
        <div className="border-b  pb-3 my-3 border-gray-200">
          <Swiper slidesPerView={4}>
            <nav className=" flex   " aria-label="Tabs">
              {typeBtn.map((tab, index) => (
                <SwiperSlide className="mx-1" key={tab.name + index}>
                  <button
                    key={tab.key}
                    onClick={(e) => {
                      if (!tab.disabled) {
                        let tabs2 = [...postTypes];
                        tabs2.map((tab) => (tab.current = false));
                        tabs2[index].current = true;
                        setBtnType(tabs2);
                      }
                    }}
                    className={classNames(
                      tab.current ? "btn-selected" : "btn-main",
                      tab.disabled && "opacity-50",
                      ""
                    )}
                    aria-current={tab.current ? "page" : undefined}
                  >
                    {tab.name}
                  </button>
                </SwiperSlide>
              ))}
            </nav>
          </Swiper>
        </div>
      </div>
      <div className="mt-7 px-4">
        <div className="flex  justify-between">
          <div className="flex space-x-3">
            {props.avatar && (
              <img
                className="inline-block h-10 w-10 rounded-full"
                src={props.avatar}
                alt=""
              />
            )}
            <span>{props.username}</span>
          </div>
          <div>
            <select name="" className="input-text opacity-60" disabled id="">
              <option value="">Para todos</option>
            </select>
          </div>
        </div>
        <hr className="separator my-5" />
        <div className="flex items-start space-x-4">
          <div className="min-w-0 mb-32 flex-1">
            <div>
              {typeBtn.map((tab, index) => {
                if (tab.key === "STATUS") {
                  return (
                    <NewStatus
                      onTextAreaChange={handleTextAreaChange}
                      onSelectedReaction={handleSelectedReaction}
                      onUploadingImages={handleUploadingImage}
                      onHandleTextareaFocus={handleTextareaFocus}
                      onHandleTextareaBlur={handleTextareaBlur}
                      contentText={contentText}
                      handleSavePost={handleSavePost}
                      loading={loading}
                      textareaIsFocused={textareaIsFocused}
                      images={images}
                      key={tab.key}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPublication;
