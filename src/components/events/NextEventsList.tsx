import React from "react";
import { EventCard } from "./EventCard";

const NextEventsList = () => {
  const evets = [
    {
      name: "My first event",
    },
    {
      name: "My secound event",
    },
    {
      name: "My four event",
    },
  ];
  return (
    <div>
      {evets.map((event,key) => {
        return <div key={`event-${key}`} className="m-1 my-1"> <EventCard /> </div>;
      })}
    </div>
  );
};

export default NextEventsList;
