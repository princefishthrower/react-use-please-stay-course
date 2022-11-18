import { AnimationType } from "../enums/AnimationType";
import { ArrayOfOneOrMore } from "./ArrayOfOneOrMore";

export type UsePleaseStayOptions = {
  titles: ArrayOfOneOrMore<string>;
  animationType?: AnimationType;
  faviconLinks?: string[];
  interval?: number;
  shouldAlwaysPlay?: boolean;
  restoreDefaultsOnFocus?: boolean;
};
