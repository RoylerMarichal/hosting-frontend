import { useState, useEffect } from "react";

const PostFooter = (props: {
  likes?: number;
  comments?: number;
  postId: number;
  likePostHandler: (id: string) => void;
}) => {
  const [isLlike, setIsLike] = useState(false);

  const setIsLikeFn = () => {
    //Save in localStorag in array of publciationsFavorite this id
    setIsLike(!isLlike);
    checkStorageFavorite();
  };

  const checkStorageFavorite = () => {
    let postIdInStorageRaw: string =
      localStorage.getItem("publicationsFavorites")! ?? [];

    let arrayPostId =
      postIdInStorageRaw.length > 0 ? JSON.parse(postIdInStorageRaw) : null;

    if (!arrayPostId) {
      arrayPostId = [];
    }

    let post = arrayPostId.find((post: any) => post.postId == props.postId);

    if (post) {
      let newPosts = arrayPostId.filter(
        (post: any) => post.postId !== props.postId
      );
      localStorage.setItem("publicationsFavorites", JSON.stringify(newPosts));
    } else {
      let payload = { postId: props.postId };
      arrayPostId.push(payload);
      localStorage.setItem(
        "publicationsFavorites",
        JSON.stringify(arrayPostId)
      );
    }
  };

  useEffect(() => {
    let postIdInStorageRaw: string =
      localStorage.getItem("publicationsFavorites")! ?? [];

    let arrayPostId =
      postIdInStorageRaw.length > 0 ? JSON.parse(postIdInStorageRaw) : null;

    if (arrayPostId) {
      let post = arrayPostId.find((post: any) => post.postId == props.postId);

      if (post) {
        setIsLike(true);
      }
    }
  }, []);

  return (
    <div className="flex pt-1 text-gray-700  text-sm  justify-between">
      <div className="flex justify-evenly w-1/3">
        <button className="flex space-x-1 opacity-50 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
            />
          </svg>
          <span>{props.comments}</span>
        </button>
        {/* //Likes */}
        <button
          onClick={() => {
            setIsLikeFn();
            props.likePostHandler(props.postId.toString());
          }}
          className="flex space-x-1  items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`${
              isLlike ? "text-red-500 font-bold" : "text-gray-500"
            } w-6 w-6`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <span>{props.likes}</span>
        </button>
      </div>
      <div>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 opacity-40"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PostFooter;
