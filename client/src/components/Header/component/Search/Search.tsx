import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
function Search() {
  return (
    <form className="w-full rounded bg-[#e5e5e5]">
      <input
        type="text"
        className="h-7 w-[355px] rounded bg-[#e5e5e5] p-2 text-[#666] outline-none"
        placeholder="Search"
        name=""
        id=""
      />
      <button type="submit" className="px-2">
        <FontAwesomeIcon icon={faSearch} />{" "}
      </button>
    </form>
  );
}

export default Search;
