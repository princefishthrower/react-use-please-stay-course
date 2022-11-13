import { AnimationType } from "../enums/AnimationType";
import { ArrayOfOneOrMore } from "./ArrayOfOneOrMore";
export declare type UsePleaseStayOptions = {
    titles: ArrayOfOneOrMore<string>;
    animationType?: AnimationType;
    faviconLinks?: string[];
    interval?: number;
    shouldAlwaysPlay?: boolean;
};
