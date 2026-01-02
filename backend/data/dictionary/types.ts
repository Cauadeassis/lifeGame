import { Quantity, GenderId } from "../character/types.ts";

export type WordsDictionary = {
  [word: string]: {
    [gender in GenderId]: {
      [quantity in Quantity]: string;
    };
  };
};
