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
                location.pathname === "/home"
                  ? "border-b-2 border-stone-900  "
                  : " "
              } col-span-1 mx-auto pb-3  `}
              onClick={() => navigate(user ? "/home" : "/")}
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
              onClick={() => navigate("/services")}
              className={iconClassNameCommunity}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={
                  location.pathname === "/services" ? "icon-selected" : "icon"
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                />
              </svg>
            </button>
            <button
              className={`${
                location.pathname === "/invoices"
                  ? "border-b-2 border-stone-900  "
                  : " "
              } col-span-1 mx-auto pb-3 `}
              onClick={() => navigate("/invoices")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={
                  location.pathname === "/invoices" ? "icon-selected" : "icon"
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                />
              </svg>
            </button>
            <button
              className={`${
                location.pathname === "/cart"
                  ? "border-b-2 border-stone-900  "
                  : " "
              } col-span-1 mx-auto pb-3 `}
              onClick={() => navigate("/cart")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={
                  location.pathname === "/cart" ? "icon-selected" : "icon"
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </button>
            <button
              className={`${
                location.pathname === "/help"
                  ? "border-b-2 border-stone-900  "
                  : " "
              } col-span-1 mx-auto pb-3 `}
              onClick={() => navigate("/help")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={
                  location.pathname === "/help" ? "icon-selected" : "icon"
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288"
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
