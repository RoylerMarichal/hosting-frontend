import React, { useState, Fragment } from "react";

import { useLocation, useNavigate } from "react-router";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux/es/exports";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";

const Header = () => {
  const { user } = useSelector((state: any) => state.auth);
  //Sidebar
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const location = useLocation();
  const route = location.pathname.split("/")[1];

  const navigate = useNavigate();

  const closeSession = (e: any) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch(logout());
    setOpen(false);
    navigate("/");
  };

  const HeaderNav = (location: String) => {
    return (
      <div className="fixed z-50 top-0  p-5 grid h-16 w-full grid-cols-4 items-center justify-around bg-transparent    ">
        <div className="col-span-1 mx-auto flex items-center pb-3  ">
          <button onClick={() => navigate("/")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-3 icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <h2 className="capitalize mega-title"> {route}</h2>
        </div>
      </div>
    );
  };

  const highlightedPagesCommunity = ["/apps", "/tournaments", "/contact"];
  const iconClassNameCommunity = `col-span-1 mx-auto pb-3 ${
    highlightedPagesCommunity.includes(location.pathname)
      ? "border-b-2 border-stone-900"
      : ""
  }`;

  const routes = [
    "profile",
    "settings",
    "notifications",
    "messages",
    "bookmarks",
    "lists",
    "topics",
    "moments",
    "post",
    "shop",
  ];

  return (
    <>
      {routes.includes(route) ? (
        HeaderNav(route)
      ) : (
        <div className="fixed z-50 px-5 pt-3 lg:pt-2 top-0 grid h-12 w-full grid-cols-4 items-center justify-around bg-gray-100 py-1">
          <div className="col-span-1 mx-auto pb-3  ">
            <Link className="flex items-start" to={user ? "/home" : "/"}>
              {" "}
              <img
                src="/assets/img/samyhostLogoSmall.png"
                className="max-h-9 -mt-2"
                alt=""
              />
             
            </Link>
          </div>
          <div className="col-span-2  lg:hidden space-x-24 mx-auto pb-3  "></div>
          {/* Center side Nav */}
          <div className="col-span-2 pt-1 hidden lg:flex space-x-24 mx-auto pb-3  ">
            <button
              className={`${
                location.pathname === "/"
                  ? "border-b-2 border-stone-900  "
                  : " "
              } col-span-1 mx-auto pb-3  `}
              onClick={() => navigate("/")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={location.pathname === "/" ? "icon-selected" : "icon"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </button>
            <button
              onClick={() => navigate("/apps")}
              className={iconClassNameCommunity}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={
                  location.pathname === "/apps" ? "icon-selected" : "icon"
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </button>
            <button
              className={`${
                location.pathname === "/god"
                  ? "border-b-2 border-stone-900  "
                  : " "
              } col-span-1 mx-auto pb-3 `}
              onClick={() => navigate("/god")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={
                  location.pathname === "/god" ? "icon-selected" : "icon"
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
            <button
              className={`${
                location.pathname === "/peoples"
                  ? "border-b-2 border-stone-900  "
                  : " "
              } col-span-1 mx-auto pb-3 `}
              onClick={() => navigate("/peoples")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={
                  location.pathname === "/peoples" ? "icon-selected" : "icon"
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
            <button
              className={`${
                location.pathname === "/messages"
                  ? "border-b-2 border-stone-900  "
                  : " "
              } col-span-1 mx-auto pb-3 `}
              onClick={() => navigate("/messages")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={
                  location.pathname === "/messages" ? "icon-selected" : "icon"
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </div>

          {/* Right Side Nav     */}
          <div className="col-span-1 flex justify-end lg:justify-center  pb-4  ">
            <button onClick={() => setOpen(!open)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <div className="fixed inset-0" />
          <div className="fixed  inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex max-h-screen h-full flex-col overflow-y-scroll bg-white pt-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white main-color hover:text-gray-500 focus:outline-none focus:outline-none  "
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6 main-color"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative  pt-20 lg:pt-0 lg:mt-24 flex-1 px-4 sm:px-6">
                        <div className=" px-4 sm:px-6">
                          <div
                            className="  mx-auto justify-center space-y-3 flex flex-col "
                            aria-hidden="true"
                          >
                            <Link to={"/profile"}>
                              <button
                                onClick={() => setOpen(!open)}
                                className="w-full px-7 text-lg color-main flex self-center justify-between  "
                              >
                                Mi perfil
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
                                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              </button>
                            </Link>
                            <Link to={"/progress"}>
                              <button
                                onClick={() => setOpen(!open)}
                                className="w-full px-7 text-lg color-main flex self-center justify-between  "
                              >
                                Mi progreso
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
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                  />
                                </svg>
                              </button>
                            </Link>
                            <Link to={"/notifications"}>
                              <button
                                onClick={() => setOpen(!open)}
                                className="w-full px-7 text-lg color-main flex self-center justify-between  "
                              >
                                Notificaciones
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
                                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                  />
                                </svg>
                              </button>
                            </Link>

                            <hr className="separator px-7 pt-16" />
                            <span className="subtitle px-7">Configuración</span>

                            <Link to={"/settings"}>
                              <button
                                onClick={() => setOpen(!open)}
                                className="w-full px-7 text-lg color-main flex self-center justify-between  "
                              >
                                Ajustes de la cuenta
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
                                    d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
                                  />
                                </svg>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="flex  py-3 text-sm px-2 bg-gray-50  w-full   flex-wrap">
                        <div className="mx-auto">
                          <Link
                            onClick={() => setOpen(!open)}
                            className="px-3"
                            to={"/about"}
                          >
                            ¿Quiénes somos?
                          </Link>
                          <Link
                            onClick={() => setOpen(!open)}
                            className="px-3"
                            to={"/roadmap"}
                          >
                            Road Map
                          </Link>
                        </div>
                      </div>
                      {user?.username && (
                        <div className="flex flex-shrink-0 border-t    g-main p-4 py-7">
                          <div className="group block flex-shrink-0">
                            <div className="flex items-center">
                              <div>
                                <img
                                  className="inline-block h-10 w-10 rounded-full"
                                  src={user?.avatar ?? "/assets/img/avatar.png"}
                                  alt=""
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-base font-medium text-white">
                                  {user?.username}
                                </p>
                                <button
                                  onClick={(e) => closeSession(e)}
                                  className="text-sm font-medium text-indigo-200 group-hover:text-white"
                                >
                                  Cerrar Sección
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Header;
