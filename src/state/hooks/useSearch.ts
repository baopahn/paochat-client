import { useSelector } from "react-redux";
import { State } from "state/types";

const useSearch = () => {
  const search = useSelector((state: State) => state.search);
  return search;
};

export default useSearch;
