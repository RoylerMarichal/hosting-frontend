import React, { RefObject, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { FaceSmileIcon } from "@heroicons/react/20/solid";
import {
  FaceFrownIcon,
  FaceSmileIcon as FaceSmileIconOutline,
  LockClosedIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const TextArea = ({ onChange, onFocus, onBlur, contentText }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef: RefObject<HTMLTextAreaElement> = useRef(null);


  const handleTextarea = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emojiObject) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const text = textarea.value;
      const emoji = emojiObject.emoji; // Acceder a la propiedad 'emoji' del objeto
      const newText =
        text.substring(0, startPos) +
        emoji +
        text.substring(endPos, text.length);
      onChange(newText);
      textarea.focus();
      textarea.selectionStart = startPos + emoji.length;
      textarea.selectionEnd = startPos + emoji.length;
    }
  };

  return (
    <div>
      <textarea
        ref={textareaRef}
        rows={3}
        onFocus={()=>onFocus}
        onBlur={onBlur}
        onChange={(e) => {
          handleTextarea(e);
          onChange(e.target.value);
        }}
        value={contentText}
        className="block w-full focus:outline-none border-transparent p-0 pb-2 sm:text-sm"
        placeholder="Add your post..."
      />

      <div>
        {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
      </div>

      <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
        {showEmojiPicker ? (
          <XMarkIcon className="h-7  text-gray-500  w-7" />
        ) : (
          <FaceSmileIconOutline className="h-7 text-gray-500 w-7" />
        )}
      </button>
    </div>
  );
};

export default TextArea;
