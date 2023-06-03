import ReactPlayer from "react-player";
import PostOptions from "./PostOptions";
import { PublicationContent } from "../../types/Types";
const PostVideo = (props: {
  userName?: string;
  userSlug?: string;
  userAvatar?: string;
  folleworsCount?: number;
  postContents: [PublicationContent]
  resume?: string;
}) => {
  return (
    <div className="hover:bg-gray-100 my-2 flex flex-col p-4 rounded-lg">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex   space-x-4">
            <div className="flex-shrink-0 flex flex-col justify-between  ">
              <img
                className="h-8 w-8 object-cover rounded-full"
                src={props.userAvatar ?? "/assets/img/avatar.jpg"}
                alt=""
              />
              <span className="text-sm">{props.folleworsCount}</span>
            </div>
            <div className="min-w-0 ">
              <p className="truncate text-sm font-medium text-gray-900">
                {props.userName}
              </p>
              <p className="truncate text-sm text-gray-900">
                {"@" + props.userSlug}
              </p>
              <p className="pt-1  text-sm text-gray-600">{props.resume}</p>
            </div>
            <div className="flex">
              {/* <button className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="icon-sm"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button> */}
            </div>
          </div>
        </div>
        <div>
          <PostOptions />
        </div>
      </div>
      <div className="flex flex-col">
      {props.postContents?.map((content,index) => {
          return content.type === "TEXT" ? (
            <p key={`content-${content.type}${index}`} className="content mt-2">{content.content}</p>
          ) : content.type === "GALLERY" ? (
            <img key={`content-${content.type}${index}`} className="content mt-2" src={content.content} alt="" />
          ) : null;
        })}
        <div className="player-wrapper mt-3">
          <ReactPlayer
            className="react-player"
            url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default PostVideo;
