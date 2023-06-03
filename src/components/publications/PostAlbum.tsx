import PostOptions from "./PostOptions";
import { PublicationContent } from "../../types/Types";
import defaults from "../../utils/defaults";
import Reaction from "./commons/Reaction";
import { useState } from "react";
import PostFooter from "./commons/PostFooter";
import { Link } from "react-router-dom";

const PostAlbum = (props: {
  postId: number;
  userName?: string;
  userSlug?: string;
  userAvatar?: string;
  folleworsCount?: number;
  postContents: [PublicationContent];
  resume?: string;
  reaction?: string;
  likesCount?: number;
  commentsCount?: number;
  likePostHandler: (id: string) => void;
}) => {
  const contentTypeText = props.postContents.filter(
    (content) => content.type === "TEXT"
  );
  const contentTypeGallery = props.postContents.filter(
    (content) => content.type === "GALLERY"
  );

  let mood = defaults.moods.find((mood) => props.reaction === mood.name);

  return (
    <div className="hover:bg-gray-200 bg-gray-100 my-2 flex flex-col p-4 rounded-lg m-3">
      <div className="flex justify-between">
        <div className="flex items-center spac`e-x-2">
          <div className="flex   space-x-4">
            <div className="flex-shrink-0 flex flex-col justify-between  ">
              <Link to={"/" + props.userSlug}>
                {" "}
                <img
                  className="h-8 w-8 object-cover rounded-full"
                  src={props.userAvatar ?? "/assets/img/avatar.jpg"}
                  alt=""
                />
              </Link>
              <span className="text-sm">{props.folleworsCount}</span>
            </div>
            <div className="min-w-0 ">
              <div className="flex space-x-3">
                <Link to={"/" + props.userSlug}>
                  {" "}
                  <p className="truncate text-sm font-medium text-gray-900">
                    {props.userName}
                  </p>
                </Link>
                {mood && mood.name !== "I feel nothing" ? (
                  <Reaction mood={mood} />
                ) : null}
              </div>
              <Link to={"/" + props.userSlug}>
                {" "}
                <p className="truncate text-sm text-gray-900">
                  {"@" + props.userSlug}
                </p>
              </Link>
              <p className="pt-1  text-sm text-gray-600">{props.resume}</p>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 items-center">
          {/* <PostOptions /> */}
        </div>
      </div>
      <div className="flex flex-col">
        {contentTypeText?.map((text, index) => {
          return (
            <div key={`content-${text.type}${index}`}>
              <p key={`content-${text.type}${index}`} className="content mt-2">
                {text.content}
              </p>
            </div>
          );
        })}
        <div className="grid gap-2 grid-cols-2 ">
          {contentTypeGallery?.map((content, index) => {
            return (
              <div key={`content-${content.type}${index}`}>
                {props.postContents.filter((con) => con.type === "GALLERY")
                  .length === 1 ? (
                  <div className="col-span-2 lg:col-span-2">
                    <img
                      key={`content-${content.type}${index}`}
                      className="content-image mt-2"
                      src={content.content}
                      alt=""
                    />
                  </div>
                ) : props.postContents.filter((con) => con.type === "GALLERY")
                    .length === 2 ? (
                  <div className="col-span-1 lg:col-span-1">
                    <img
                      key={`content-${content.type}${index}`}
                      className="content-image mt-2"
                      src={content.content}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="col-span-1 lg:col-span-1">
                    <img
                      key={`content-${content.type}${index}`}
                      className="content-image mt-2"
                      src={content.content}
                      alt=""
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <hr className="mt-4" />
      <PostFooter
        postId={props.postId}
        likes={props.likesCount}
        comments={props.commentsCount}
        likePostHandler={props.likePostHandler}
      />
    </div>
  );
};

export default PostAlbum;
