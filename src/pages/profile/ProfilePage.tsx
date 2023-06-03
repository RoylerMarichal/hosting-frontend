import { useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_CURRENT_USER, GET_USER, UPLOAD_AVATAR } from "../../utils/queries";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import TimeLine from "../../components/publications/TimeLineHome";
import TimelineProfile from "../../components/publications/TimelineProfile";

const ProfilePage = () => {
  const { token, user } = useSelector((state: any) => state.auth);
  let params = useParams();

  const [tabs, setTabs] = useState([
    { name: "Publicaciones", href: "#", current: false },
    // { name: "Goals", href: "#", current: false },
    { name: "Info", href: "#", current: true },
    // { name: "Pins", href: "#", current: false },
  ]);

  let usernameRaw = params.username ? params.username : user.username;

  const { client, loading, data } = useQuery(GET_USER, {
    variables: { username: usernameRaw },
  });

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div>
       <div className="fixed z-50 top-13 right-4">
        <button className="px-4 pb-3 pt-1 rounded-b-xl rounded-t-0 rounded-4xl g-main-2 floating-button">
          Seguir
        </button>
      </div>
      <div className="flex flex-col mt-1   z-10">
        <div
          className={`h-48 bg-black/5   `}
          style={{
            backgroundImage: `url(${data?.getUser?.cover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="flex flex-col px-3  ">
          <div className="flex -mt-16 justify-between">
            <div className="  w-2/3 flex flex-col ">
              {data?.getUser?.avatar ? (
                <img
                  alt="Avatar"
                  src={data?.getUser?.avatar ?? <Skeleton circle={true} />}
                  className="h-28 border-4 shadow-xl  border-x-zinc-200 w-28 rounded-full object-cover  "
                  width={48}
                  height={48}
                />
              ) : (
                <img
                  src="/assets/img/avatar.png"
                  className="h-28 border-4 shadow-xl  border-x-zinc-200 w-28 rounded-full object-cover"
                />
              )}
              <div className="flex items-center space-x-3">
                <span className="title">
                  {data?.getUser?.name || <Skeleton />}
                </span>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-green-800 bg-green-200 rounded-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg> */}
              </div>
              <div className="flex">
                <span className="subtitle">
                  @{data?.getUser?.username || <Skeleton />}
                </span>
                {/* <span className="px-1"> - </span> */}
                {/* <span className="subtitle text-sm">
                  {data?.getUser?.type || <Skeleton />}
                </span> */}
              </div>
            </div>
            <div className="flex w-1/3 space-x-3"></div>
          </div>

          <div className="flex space-x-3 mt-2">
            <div className="text-gray-700 text-base">
              <span className=" font-bold ">
                {" "}
                {data?.getUser?._count.following}{" "}
              </span>
              <span className="text-gray-500">siguiendo</span>
            </div>
            <div className="text-gray-700 text-base">
              <span className=" font-bold ">
                {" "}
                {data?.getUser?._count.followedBy}{" "}
              </span>
              <span className="text-gray-500">seguidores</span>
            </div>
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <span className="text-gray-500 text-base">
                {data?.getUser?.city}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="block px-3">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
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
          {tabs.map((tab) => {
            if (tab.current) {
              if (tab.name === "Publicaciones") {
                return (
                  <div key={tab.name}>
                    <TimelineProfile userId={data?.getUser?.id} />
                  </div>
                );
              }
              if (tab.name === "Info") {
                return (
                  <div className="py-3" key={tab.name}>
                    <span className="text-sm ">{data?.getUser?.resume}</span>
                  </div>
                );
              }
            }
          })}
        </div>
      </div>
     
    </div>
  );
};

export default ProfilePage;
