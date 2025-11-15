import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { genders } from "../data/genders";
import { skinTones } from "../data/skinTones";
import { incomes } from "../data/incomes";
import namesByCountry from "../data/namesByCountry";

export function generateRandomStatus() {
  let allStatus = new Array(4).fill(0);
  let sumOffAll = 0;
  for (let singleStat = 0; singleStat < 3; singleStat++) {
    const remainingStatus = 4 - singleStat;
    const maxLimit = Math.min(100, 240 - sumOffAll);
    const minLimit = Math.max(0, 240 - sumOffAll - (remainingStatus - 1) * 100);
    const range = maxLimit - minLimit + 1;
    let valor = Math.floor(Math.random() * range) + minLimit;
    allStatus[singleStat] = valor;
    sumOffAll += valor;
  }
  const ultimoValor = 240 - sumOffAll;
  allStatus[3] = ultimoValor;
  for (let currentPosition = allStatus.length - 1; currentPosition > 0; currentPosition--) {
    const randomPosition = Math.floor(Math.random() * (currentPosition + 1));
    [allStatus[currentPosition], allStatus[randomPosition]] = [allStatus[randomPosition], allStatus[currentPosition]];
  }
  console.log(allStatus);
  return allStatus;
}
export function generateRandomCharacter() {
  const getRandomItem = (array) =>
    array[Math.floor(Math.random() * array.length)];
  const countries = Object.keys(namesByCountry);
  const gender = getRandomItem(genders);
  const country = getRandomItem(countries);
  const firstName = getRandomItem(namesByCountry[country][gender.id]);
  const lastName = getRandomItem(namesByCountry[country]["last"]);
  const skinTone = getRandomItem(skinTones[gender.id]);
  const income = getRandomItem(incomes[gender.id]);
  return {
    firstName,
    lastName,
    country,
    gender,
    skinTone,
    income,
  };
}
