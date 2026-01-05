import { Quantity, GenderId } from "../character/types";

export type WordsDictionary = {
  [word: string]: {
    [gender in GenderId]: {
      [quantity in Quantity]: string;
    };
  };
};
