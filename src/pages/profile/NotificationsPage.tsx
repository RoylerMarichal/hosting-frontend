import { Transition } from "@headlessui/react";
import { InboxIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
const NotificationsPage = () => {
  return (
    <div className="mx-auto mb-10 flex max-w-4xl flex-col p-7 md:px-8 xl:px-0">
      <div>
        <ul>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <InboxIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">
                Discussion moved
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
                oluptatum tenetur.
              </p>
              <div className="mt-3 flex space-x-7"></div>
            </div>
            <div className="ml-4 flex flex-shrink-0"></div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CheckCircleIcon
                className="h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">
                Nuevo seguidor
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
                oluptatum tenetur.
              </p>
              <div className="mt-3 flex space-x-7"></div>
            </div>
            <div className="ml-4 flex flex-shrink-0"></div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <img
                className="h-7 w-7 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                alt=""
              />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">Nuevo mensaje</p>
              <p className="mt-1 text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
                oluptatum tenetur.
              </p>
              <div className="mt-3 flex space-x-7"></div>
            </div>
            <div className="ml-4 flex flex-shrink-0"></div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <InboxIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">
                Discussion moved
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
                oluptatum tenetur.
              </p>
              <div className="mt-3 flex space-x-7"></div>
            </div>
            <div className="ml-4 flex flex-shrink-0"></div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <img
                className="h-7 w-7 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                alt=""
              />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">Nuevo mensaje</p>
              <p className="mt-1 text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
                oluptatum tenetur.
              </p>
              <div className="mt-3 flex space-x-7"></div>
            </div>
            <div className="ml-4 flex flex-shrink-0"></div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <img
                className="h-7 w-7 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                alt=""
              />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">Nuevo mensaje</p>
              <p className="mt-1 text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
                oluptatum tenetur.
              </p>
              <div className="mt-3 flex space-x-7"></div>
            </div>
            <div className="ml-4 flex flex-shrink-0"></div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default NotificationsPage;
