import ReactTooltip from "react-tooltip";
export const ButtonMain = ({ toolTipText, disable, eventHandler, Icon }) => {
  return (
    <>
      <ReactTooltip />
      <button
        disabled={disable}
        data-tip={toolTipText}
        data-type="dark"
        data-place="bottom"
        data-effect="solid"
        onClick={eventHandler}
        className="flex disabled:opacity-50 disabled:cursor-default items-center justify-center p-4 rounded-full transition"
      >
        <Icon className="h-6 w-6 text-gray-500" />
      </button>
    </>
  );
};
