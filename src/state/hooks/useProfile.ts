import { useSelector } from "react-redux";
import { State } from "state/types";

const useProfile = () => {
  const profile = useSelector((state: State) => state.profile);
  return profile;
};

export default useProfile;
