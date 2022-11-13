import { AnimationType } from "../enums/AnimationType";
import { ArrayOfOneOrMore } from "./../types/ArrayOfOneOrMore";
import { issueWarningMessage } from "./issueWarningMessage";

export const validateParameters = (
  titles: ArrayOfOneOrMore<string>,
  animationType: AnimationType
) => {
  if (titles.length === 1 && titles[0] === "") {
    issueWarningMessage(
      "You have passed an empty string as the title. This will result in no text being displayed, regardless of AnimationType chosen."
    );
  }
  if (titles.length > 1 && animationType === AnimationType.CASCADE) {
    issueWarningMessage(
      'You have passed more than one title, but have specified "AnimationType.CASCADE". Only the first title in the titles array will be used.'
    );
  }
  if (titles.length > 1 && animationType === AnimationType.MARQUEE) {
    issueWarningMessage(
      'You have passed more than one title, but have specified "AnimationType.MARQUEE". Only the first title in the titles array will be used.'
    );
  }
};
