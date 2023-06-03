import React from "react";
import PostOptions from "./PostOptions";
import GalleryComponent from "./commons/GallaryComponent";
import PostFooter from "./commons/PostFooter";
import { Link } from "react-router-dom";

interface Props {
  htmlContent: string;
}

 

const PostStatus = ({ contents, author, onClickLikePost, likeCount, postId }) => {

 
  return (
    <div>
      <div className="hover:bg-gray-100 my-2 flex flex-col p-4 rounded-lg">
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex   space-x-4">
              <div className="flex-shrink-0 flex flex-col justify-between  ">
                <img
                  className="h-8 w-8 object-cover rounded-full"
                  src={author.avatar ?? "/assets/img/avatar.jpg"}
                  alt=""
                />
                <span className="text-sm">{}</span>
              </div>
              <Link to={"/" + author.username}>
              <div className="min-w-0 ">
                <p className="truncate text-sm font-medium text-gray-900">
                  {author.username}
                </p>
                <p className="truncate text-sm text-gray-900">
                  {"@" + author.username}
                </p>
              </div>
              </Link>
            </div>
          </div>
          <div>
            <PostOptions />
          </div>
        </div>
        <div className="flex    flex-col space-y-2">
          {contents
            ?.filter((contentG: any) => contentG.type === "TEXT")
            .map((content: any, index: number) => {
              return (
                <div
                  className="prose  mt-2 text-left"
                  key={`content-${content.type}${index}`}
                >
                  <div
                    className=""
                    dangerouslySetInnerHTML={{ __html: content.content }}
                  ></div>
                </div>
              );
            })}
         
           <GalleryComponent contents={contents} /> 
        </div>
        <PostFooter postId={postId} likes={likeCount} likePostHandler={onClickLikePost} />
      </div>
    </div>
  );
};

export default PostStatus;
