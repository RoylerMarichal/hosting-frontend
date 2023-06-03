import { Link } from "react-router-dom"

const AppCard = ({img,url,text}) => {
  return (
 <Link to={url}>    <div className="rounded-2xl bg-gradient-to-r from-white0 to-gray-300 shadow-xl  flex flex-col  py-1 ">
      <div className="   flex flex-col space-y-3 rounded-full  p-3">
        <img className="h-8 w-8" src={img} />
        <span className="text-sm text-gray-500 font-medium">
          {text}
        </span>
      </div>
    </div>
    </Link>
  );
};

export default AppCard;
