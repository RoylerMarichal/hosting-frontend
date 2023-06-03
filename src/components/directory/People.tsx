import { Link } from "react-router-dom";
import { FOLLOW_USER } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const People = (props: {
  getCurrentUserAgain: () => void;
  followers?: any;
  imageUrl?: string;
  followersCount?: number;
  name: string;
  slug: string;
  id: number;
  resume?: string;
}) => {
  const { t } = useTranslation("community");
  const { token } = useSelector((state: any) => state.auth);

  const [followUser, { data, error }] = useMutation(FOLLOW_USER, {
    variables: { followingId: Number(props.id) },
  });

 
  
  if (data) {
    props.getCurrentUserAgain();
  }

 

  const isFollowed = props.followers?.includes(Number(props.id));

  return (
    <li className="py-4">
      <div className="flex   space-x-4">
        <div className="flex-shrink-0 flex flex-col justify-between  ">
          <Link to={"/" + props.slug} className="focus:outline-none">
            {" "}
            <img
              className="h-8 w-8 rounded-full"
              src={props.imageUrl ?? "/assets/img/avatar.png"}
              alt=""
            />
          </Link>
          
        </div>
        <div className="min-w-0 ">
          <Link to={"/" + props.slug} className="focus:outline-none">
            <p className="truncate text-sm font-medium text-gray-900">
              {props.name}
            </p>
          </Link>
          <p className="truncate text-sm text-gray-900">{"@" + props.slug} {props.followersCount && props.followersCount > 1 && <span className="text-sm"> -  {props.followersCount} seguidores </span> }</p>
         { props.resume && props.resume.length > 8 && <p className="pt-1  text-sm text-gray-600">{   props.resume?.slice(0,77)}...</p>}
        </div>
        <div className="flex-1 text-right">
          {token ? (
            <button
              onClick={() => {
                followUser();
              }}
              className={`pr-3 ${isFollowed ? "btn-selected" : "btn-main"}`}
            >
              {isFollowed ?  t('UnFollow')  :  t('Follow')}
            </button>
          ) : (
            <Link to={"/auth/login/login"}>
              {" "}
              <button className={`pr-3 btn-main opacity-20`}>
                {isFollowed ?  t('UnFollow') :  t('Follow')  }
              </button>
            </Link>
          )}
        </div>
      </div>
    </li>
  );
};

export default People;
