import { useEffect } from "react";
import { issueWarningMessage } from "../utils/issueWarningMessage";

export const useMultipleInstancesCheck = () => {
  // on mount, check if we are not in production
  useEffect(() => {
    if (localStorage.getItem("usePleaseStay") !== null) {
      issueWarningMessage(
        `usePleaseStay should be mounted only once in an application. Doing otherwise could lead to 👻 strange 👻 behavior. usePleaseStay was last mounted at ${localStorage.getItem(
          "usePleaseStay"
        )} Please check your code for multiple usePleaseStay usages. This warning is only valid if you see this warning appear more than once with different 'mounted at' dates in your console.`
      );
    }
    // on mount, set the storage value to the curent ISO time
    localStorage.setItem("usePleaseStay", new Date().toISOString());
    // on unmount, remove the value from localStorage
    return () => localStorage.removeItem("usePleaseStay");;
  }, []);
};
