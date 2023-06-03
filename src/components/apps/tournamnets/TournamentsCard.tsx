import { Link } from "react-router-dom";

const TournamentsCommunityCard = (props: {
  imageUrl?: string;
  playersCount?: number;
  name: string;
  ownerSlug: string;
  resume?: string;
  startDate?: string;
  endDate?: string;
  id: number;
}) => {
  console.log('props',props.id);
  
  return (
    <li className="py-4 mx-3 border-2 border-gray-100 my-2 rounded-lg  ">
      <div className="flex justify-between  space-x-4">
        <div className="flex ml-4">
          <div className="  flex flex-col  ">
            <span className="text-sm">{props.playersCount} </span>
            <span className="text-xs">jugadores </span>
          </div>
          <div className="min-w-0 ml-10">
            <p className="truncate text-sm font-medium text-gray-900">
              {props.name}
            </p>
            <div className="flex">
              {props.ownerSlug && (
                <>
                  <p className="truncate text-sm text-gray-900">
                    {"@" + props.ownerSlug}
                  </p>
                  <p>-</p>
                </>
              )}
            </div>
            <p className="pt-1  text-sm text-gray-600">{props.resume}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex ml-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className=" icon-sm"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>

          <p className=" text-sm p-1 items-center text-gray-900">
            {props.startDate} - {props.endDate}
          </p>
        </div>

        <div className="flex justify-end">
          <Link to={"/tournament/" + props.id} className="icon mr-3">
            
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 icon-sm"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
          
          </Link>
        </div>
      </div>
    </li>
  );
};

export default TournamentsCommunityCard;
