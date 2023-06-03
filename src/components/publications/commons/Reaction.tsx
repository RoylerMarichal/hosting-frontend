const Reaction = ({ mood }) => {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="flex items-center">
      <div
        className={classNames(
          mood.bgColor,
          "w-6 h-6 rounded-full flex items-center justify-center"
        )}
      >
        <mood.icon
          className={classNames(mood.iconColor, "flex-shrink-0 h-5 w-5")}
          aria-hidden="true"
        />
      </div>
      {/* <span className="ml-3 block truncate font-medium">{mood.name}</span> */}
    </div>
  );
};

export default Reaction;
