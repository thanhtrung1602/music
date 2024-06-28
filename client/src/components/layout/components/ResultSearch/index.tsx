import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IResultSearch } from "~/types/resultSearch";
function ResultSearch(props: IResultSearch) {
  return (
    <div>
      <div className="mx-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            className="w-6"
            src={
              props.image ||
              "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
            }
            alt={props.name}
          />
          <p>{props.name}</p>
        </div>
        <div>{<FontAwesomeIcon icon={props.icon} />}</div>
      </div>
    </div>
  );
}

export default ResultSearch;
