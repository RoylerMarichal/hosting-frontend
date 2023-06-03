import MessageToDay from "../commons/MessageToDay";
import { ProgressCard } from "../commons/ProgressCard";
import NextEventsList from "../events/NextEventsList";
import PeoplesOnline from "../landing/PeoplesOnline";
import { useLocation } from "react-router";

const SidebarsLayout = (props: { side: string }) => {
  const location = useLocation();
  return (
    <div>
      {props.side === "left"
        ? location.pathname === "/" && (
            <aside className="ml-7  mt-3 hidden lg:flex lg:flex-col space-y-3 p-3">
              <h2 className="title">Contacts</h2>
              <div>
                <PeoplesOnline />
              </div>
              <div>
                <ProgressCard />
              </div>
            </aside>
          )
        : null}
      {props.side === "right"
        ? location.pathname === "/" && (
            <aside className="ml-7   hidden lg:flex lg:flex-col space-y-3 mb-10 p-3">
              <div >
                <MessageToDay />
              </div>{" "}
              <h2 className="title">Events</h2>
              <div  >
                <NextEventsList />
              </div>
            </aside>
          )
        : null}
    </div>
  );
};

export default SidebarsLayout;
