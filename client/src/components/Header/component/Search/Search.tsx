import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ISearchProps } from "~/types/search";
function Search(props: ISearchProps) {
  return (
    <form className="w-full rounded bg-[#e5e5e5]">
      <input
        type="text"
        className="h-7 w-[355px] rounded bg-[#e5e5e5] p-2 text-[#666] outline-none"
        placeholder="Search"
        name=""
        id=""
      />
      <button type="submit" className="px-2 text-[#111]">
        <FontAwesomeIcon icon={props.search} />
      </button>
    </form>
  );
}

export default Search;
