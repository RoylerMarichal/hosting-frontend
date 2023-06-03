import { Player } from "../../../types/Types";
import { Link } from "react-router-dom";

const PlayerCard = (props: { player: Player, ranking: number }) => {
  return (
    <li className={`py-4  flex justify-between`}>
      <div className="flex   space-x-4">
        <div className={`  p-5  ${props.ranking == 1 && 'bg-green-500 ' }  ${props.ranking == 2 && 'bg-blue-500 ' }  ${props.ranking == 3 && 'bg-yellow-500 ' }`}>{props.ranking}</div>
        <div className="flex-shrink-0 self-center flex flex-col justify-between  ">
          <Link
            to={"/" + props.player?.user?.slug}
            className="focus:outline-none"
          >
            {" "}
            <img
              className="h-8 w-8 rounded-full"
              src={props.player?.user?.avatar ?? "/assets/img/avatar.png"}
              alt=""
            />
          </Link>
        </div>
        <div className="min-w-0 self-center  ">
          <Link
            to={"/" + props.player?.user?.slug}
            className="focus:outline-none"
          >
            <p className="truncate text-sm font-medium text-gray-900">
              {props.player?.user?.username}
            </p>
          </Link>
        </div>
      </div>
      <div className="self-center ">
       <span className="font-bold"> {props.player?.points}</span> puntos
      </div>
    </li>
  );
};

export default PlayerCard;
