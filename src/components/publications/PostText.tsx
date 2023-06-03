import ReactPlayer from "react-player";
import PostOptions from "./PostOptions";
import { PublicationContent } from "../../types/Types";

const PostText = (props: {
  userName?: string;
  userSlug?: string;
  userAvatar?: string;
  folleworsCount?: number;
  postContents: [PublicationContent];
  resume?: string;
  reaction?: string;
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
          </div>
        </div>
        <div>
          <PostOptions />
        </div>
      </div>
      <div className="flex">
      {props.postContents?.map((content,index) => {
          return content.type === "TEXT" ? (
            <p key={`content-${content.type}${index}`} className="content mt-2">{content.content}</p>
          ) : content.type === "GALLERY" ? (
            <img key={`content-${content.type}${index}`} className="content mt-2" src={content.content} alt="" />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default PostText;
