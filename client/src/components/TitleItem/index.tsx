type Title = {
  icon: string;
  _icon?: string;
  title_left: string;
  title_right: string;
};
function TitleItem(props: Title) {
  return (
    <div className="flex items-center justify-between gap-7 border-b p-2 text-xs text-[#999]">
      <p className="flex items-center gap-2">
        <img
          className="h-[24px] w-[21px]"
          src={props.icon}
          alt={props.title_left}
        />
        <span>{props.title_left}</span>
      </p>
      <p className="flex items-center gap-1">
        {props._icon && <img src={props._icon} alt={props.title_right} />}
        <span>{props.title_right}</span>
      </p>
    </div>
  );
}

export default TitleItem;
