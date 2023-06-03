import { Link } from "react-router-dom";
import {
  LifebuoyIcon,
  NewspaperIcon,
  PhoneIcon,
} from "@heroicons/react/20/solid";
import defaults from "../../utils/defaults";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

const Hero = () => {
  const cards = [
    {
      name: "Te ayudamos a conectar con Dios",
      description:
        "Te ofrecemos herramientas devocionales únicas que puedes usar para crear una rutina sólida e increbantable de comunición con Dios.",
      icon: ArrowUpCircleIcon,
    },
    {
      name: "Te ayudamos a conectar con personas, ministerios e iglesias",
      description:
        "Te brindamos una plataforma para que puedas conectar con personas, ministerios e iglesias a través de herramientas útiles y que agregan valor para todos.",
      icon: LifebuoyIcon,
    },
    {
      name: "Te ayudamos en tu crecimiento espiritual",
      description:
        "Te garantizamos un contenido cristocéntrico y bíblico que te ayudará a crecer espiritualmente y a tener una vida más plena para con Dios.",
      icon: NewspaperIcon,
    },
  ];

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1097 845"
        aria-hidden="true"
        className="hidden transform-gpu blur-3xl sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:w-[68.5625rem]"
      >
        <path
          fill="url(#7c63f5ae-130c-4c0f-963f-50ac7fe8d2e1)"
          fillOpacity=".2"
          d="M301.174 646.641 193.541 844.786 0 546.172l301.174 100.469 193.845-356.855c1.241 164.891 42.802 431.935 199.124 180.978 195.402-313.696 143.295-588.18 284.729-419.266 113.148 135.13 124.068 367.989 115.378 467.527L811.753 372.553l20.102 451.119-530.681-177.031Z"
        />
        <defs>
          <linearGradient
            id="7c63f5ae-130c-4c0f-963f-50ac7fe8d2e1"
            x1="1097.04"
            x2="-141.165"
            y1=".22"
            y2="363.075"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#776FFF" />
            <stop offset={1} stopColor="#FF4694" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1097 845"
        aria-hidden="true"
        className="absolute left-1/2 -top-52 -z-10 w-[68.5625rem] -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0"
      >
        <path
          fill="url(#49c00522-612e-41d3-bb32-ce7d1fa28850)"
          fillOpacity=".2"
          d="M301.174 646.641 193.541 844.786 0 546.172l301.174 100.469 193.845-356.855c1.241 164.891 42.802 431.935 199.124 180.978 195.402-313.696 143.295-588.18 284.729-419.266 113.148 135.13 124.068 367.989 115.378 467.527L811.753 372.553l20.102 451.119-530.681-177.031Z"
        />
        <defs>
          <linearGradient
            id="49c00522-612e-41d3-bb32-ce7d1fa28850"
            x1="1097.04"
            x2="-141.165"
            y1=".22"
            y2="363.075"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#776FFF" />
            <stop offset={1} stopColor="#FF4694" />
          </linearGradient>
        </defs>
      </svg>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Creo.red
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            {defaults.appDescription}
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-x-6">
          <div className="flex space-x-3">
            <Link to={"/auth/login/register"}>
              <button className="btn-main">Regístrate</button>{" "}
            </Link>
            <Link to={"/auth/login/login"}>
              <button className="btn-main"> Accede</button>{" "}
            </Link>
          </div>
          {/* <span className="text-white pt-3 text-sm ">
            More than 352k Christians are online
          </span> */}
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:gap-8">
          {cards.map((card) => (
            <div
              key={card.name}
              className="flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10"
            >
              <card.icon
                className="h-7 w-5 flex-none text-indigo-400"
                aria-hidden="true"
              />
              <div className="text-base leading-7">
                <h3 className="font-semibold text-white">{card.name}</h3>
                <p className="mt-2 text-gray-300">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    // <div className="  relative isolate overflow-hidden bg-gray-900">
    //   <div className="py-24 px-6 sm:px-6 sm:py-32 lg:px-8">
    //     <div className="mx-auto  max-w-2xl text-center">
    //       <h2 className="text-4xl font-bold tracking-tight text-white">
    //         Creo
    //         <br />
    //         Start using our app today.
    //       </h2>
    //       <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
    //         In a world of darkness, make the light of the gospel shine. Creo
    //         brings you closer to God and connects you with Christians around the
    //         world
    //       </p>
    //       <div className="mt-10 flex flex-col items-center justify-center gap-x-6">
    //         <div className="flex space-x-3">
    //           <Link to={"/auth/login/register"}>
    //             <button className="btn-main"> Sign up</button>{" "}
    //           </Link>
    //           <Link to={"/auth/login/login"}>
    //             <button className="btn-main"> Sing in</button>{" "}
    //           </Link>
    //         </div>
    //         <span className="text-white pt-3 text-sm ">
    //           More than 352k Christians are online
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     viewBox="0 0 1024 1024"
    //     className="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
    //     aria-hidden="true"
    //   >
    //     <circle
    //       cx={512}
    //       cy={512}
    //       r={512}
    //       fill="url(#8d958450-c69f-4251-94bc-4e091a323369)"
    //       fillOpacity="0.7"
    //     />
    //     <defs>
    //       <radialGradient
    //         id="8d958450-c69f-4251-94bc-4e091a323369"
    //         cx={0}
    //         cy={0}
    //         r={1}
    //         gradientUnits="userSpaceOnUse"
    //         gradientTransform="translate(512 512) rotate(90) scale(512)"
    //       >
    //         <stop stopColor="#7775D6" />
    //         <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
    //       </radialGradient>
    //     </defs>
    //   </svg>
    // </div>
  );
};

export default Hero;
