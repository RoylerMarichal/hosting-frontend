import React, { useRef } from "react";
import TextArea from "./parts/TextArea";
import SelectMod from "./parts/SelectMod";
import Loading from "../../commons/Loading";
import UploadImages from "./parts/UploadImages";

const NewStatus = ({
  onTextAreaChange,
  onSelectedReaction,
  onUploadingImages,
  onHandleTextareaFocus,
  onHandleTextareaBlur,
  handleSavePost,
  textareaIsFocused,
  contentText,
  images,
  loading,
}) => {
  const buttonImageUnload = useRef<HTMLButtonElement>(null);

  return (
    <div>
      {" "}
      <div className="border-b border-gray-200 focus-within:border-indigo-600">
        <TextArea
        contentText={contentText}
          onBlur={onHandleTextareaBlur}
          onFocus={onHandleTextareaFocus}
          onChange={onTextAreaChange}
        />
        <div>
          <UploadImages
            images={images}
            buttonImageUnload={buttonImageUnload}
            onChange={onUploadingImages}
          />
        </div>
      </div>
      <div className="flex justify-between pt-2">
        <div className="flex items-center space-x-5">
          <div className="flow-root">
            <button
              onClick={() => {
                buttonImageUnload?.current?.click();
              }}
              type="button"
              className="group relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 icon-new-post  "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </button>
          </div>
          <SelectMod onChange={onSelectedReaction} />
        </div>

        <div className="flex-shrink-0 flex px-3">
          {textareaIsFocused ? (
            <>
            <div className="flex space-x-3 items-center">
              <span>... escribiendo </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="btn-main"
              >
                Listo
              </button>

            </div>
            </>
          ) : (
            <>
              {loading && <Loading />}
              <button
                disabled={textareaIsFocused}
                onClick={(e) => {
                  e.preventDefault();
                  handleSavePost();
                }}
                type="submit"
                className={`inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm
             font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
               textareaIsFocused && "opacity-80"
             } `}
              >
                Publicar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewStatus;
