type Button = {
  title: string;
  img: string;
  g: number;
  b: string;
  py?: string | number;
  px?: string | number;
  tc: string;
  tf: string | number;
  pr?: string | number;
  pl?: string | number;
};

function Button(props: Button) {
  return (
    <button
      className={`flex items-center rounded py-[${props.py}] pr-${props.pr} pl-[${props.pl}] px-[${props.px}] border border-[${props.b}] gap-${props.g} text-[${props.tc}] text-${props.tf}`}
    >
      <img src={props.img} alt="" />
      <span>{props.title}</span>
    </button>
  );
}

export default Button;
