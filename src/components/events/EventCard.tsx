export const EventCard = () => {
  return (
    <>
      <div className="hover:bg-gray-100 rounded-lg cursor-pointer p-2">
        <div className="flex items-center ">
          <div className="flex h-10 w-10 rounded-full bg-gray-100 items-center justify-center">
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
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
              />
            </svg>
          </div>
          <div className="px-3 flex flex-col">
            <h3 className="subtitle">Event 1</h3>
            <p className="text">@Royler Marichal</p>
          </div>
          <div className="px-3 flex flex-col">
            <h3 className="subtitle">25 de febrero</h3>
            <p className="text">Miami Beach</p>
          </div>
        </div>
        <p className="text p-2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui repellat
          quod, quam at dolore dolor cupiditate rerum praesentium...
        </p>
      </div>
    </>
  );
};
