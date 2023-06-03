import {
  CheckIcon,
  HandThumbUpIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import React from "react";
import defaults from '../../utils/defaults';
import { BellAlertIcon, BoltIcon } from "@heroicons/react/24/outline";

const ReadMap = () => {
  const timeline = [
    {
      id: 11,
      content: "Módulo de tienda",
      target: "Equipo de desarrollo",
      href: "#",
      date: "Mar 20",
      datetime: "2020-09-20",
      icon: BellAlertIcon,
      iconBackground: "bg-gray-400",
    },
    {
      id: 11,
      content: "Módulo de devocional",
      target: "Equipo de desarrollo",
      href: "#",
      date: "Mar 20",
      datetime: "2020-09-20",
      icon: BellAlertIcon,
      iconBackground: "bg-gray-400",
    },
    {
      id: 1,
      content: "Sistema de notificaciones por email",
      target: "Equipo de desarrollo",
      href: "#",
      date: "Mar 15",
      datetime: "2020-09-20",
      icon: BellAlertIcon,
      iconBackground: "bg-gray-400",
    },
    {
      id: 2,
      content: "Filtro para el directorio",
      target: "Equipo de desarrollo",
      href: "#",
      date: "Mar 10",
      datetime: "2020-09-20",
      icon: BellAlertIcon,
      iconBackground: "bg-gray-400",
    },
    {
      id: 3,
      content: "Módulo de eventos",
      target: "Equipo de desarrollo",
      href: "#",
      date: "Mar 1",
      datetime: "2020-09-22",
      icon: BoltIcon,
      iconBackground: "bg-blue-500",
    },
    {
      id: 4,
      content: "Módulo de torneo bíblico",
      target: "Equipo de desarrollo",
      href: "#",
      date: "Feb 15",
      datetime: "2020-09-28",
      icon: CheckIcon,
      iconBackground: "bg-green-500",
    },
    {
      id: 5,
      content: "Lanzamiento de la version 1.0 BETA",
      target: "Equipo de desarrollo",
      href: "#",
      date: "Feb 1",
      datetime: "2020-10-04",
      icon: CheckIcon,
      iconBackground: "bg-green-500",
    },
  ];

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className=" max-w-2xl mx-auto   px-7 lg:px-16 py-24 sm:py-24">
      <div className="mx-auto mb-10 ax-w-2xl lg:mx-0">
        <h2 className="text-4xl font-bold tracking-tight text-gray-700 sm:text-6xl">
           RoadMap
        </h2>
         
      </div>
      <div className="flow-root">
        <ul role="list" className="-mb-8">
          {timeline.map((event, eventIdx) => (
            <li key={event.id}>
              <div className="relative pb-8">
                {eventIdx !== timeline.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={classNames(
                        event.iconBackground,
                        "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                      )}
                    >
                      <event.icon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-500">
                        {event.content}{" "}
                        <a
                          href={event.href}
                          className="font-medium text-gray-900"
                        >
                          {event.target}
                        </a>
                      </p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      <time dateTime={event.datetime}>{event.date}</time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReadMap;
