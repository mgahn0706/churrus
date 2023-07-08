import { useState, useEffect } from "react";
import { PictureType } from "../types";

export default function usePictureSet({ round }: { round: number }) {
  const SHAPE: ("circle" | "square" | "triangle")[] = [
    "circle",
    "square",
    "triangle",
  ];
  const COLOR: ("red" | "yellow" | "blue")[] = ["red", "yellow", "blue"];
  const BACKGROUND_COLOR: ("white" | "gray" | "black")[] = [
    "white",
    "gray",
    "black",
  ];

  const [pictures, setPictures] = useState<PictureType[]>([]);
  const [availableSets, setAvailableSets] = useState<number[][]>([]);

  const generatePictures = () => {
    const pictures: PictureType[] = [];
    SHAPE.forEach((shape) => {
      COLOR.forEach((color) => {
        BACKGROUND_COLOR.forEach((backgroundColor) => {
          pictures.push({
            shape,
            color,
            backgroundColor,
          });
        });
      });
    });
    pictures.sort(() => Math.random() - 0.5);
    setPictures(pictures.slice(0, 9));
  };

  const calculateAvailableSets = () => {
    if (pictures.length < 9) {
      return;
    }

    const getAllCombinations = (
      array: number[],
      combinationLength: number
    ): number[][] => {
      const combinations: number[][] = [];

      function backtrack(startIndex: number, currentCombination: number[]) {
        if (currentCombination.length === combinationLength) {
          combinations.push([...currentCombination]);
          return;
        }

        for (let i = startIndex; i < array.length; i++) {
          currentCombination.push(array[i]);
          backtrack(i + 1, currentCombination);
          currentCombination.pop();
        }
      }

      backtrack(0, []);

      return combinations;
    };

    const allSets = getAllCombinations([1, 2, 3, 4, 5, 6, 7, 8, 9], 3);

    const availableSets = allSets.filter((set) => {
      const [first, second, third] = set;
      const firstPicture = pictures[first - 1];
      const secondPicture = pictures[second - 1];
      const thirdPicture = pictures[third - 1];

      const isShapeSet =
        (firstPicture.shape === secondPicture.shape &&
          secondPicture.shape === thirdPicture.shape) ||
        (firstPicture.shape !== secondPicture.shape &&
          secondPicture.shape !== thirdPicture.shape &&
          firstPicture.shape !== thirdPicture.shape);

      const isColorSet =
        (firstPicture.color === secondPicture.color &&
          secondPicture.color === thirdPicture.color) ||
        (firstPicture.color !== secondPicture.color &&
          secondPicture.color !== thirdPicture.color &&
          firstPicture.color !== thirdPicture.color);

      const isBackgroundColorSet =
        (firstPicture.backgroundColor === secondPicture.backgroundColor &&
          secondPicture.backgroundColor === thirdPicture.backgroundColor) ||
        (firstPicture.backgroundColor !== secondPicture.backgroundColor &&
          secondPicture.backgroundColor !== thirdPicture.backgroundColor &&
          firstPicture.backgroundColor !== thirdPicture.backgroundColor);

      return isShapeSet && isColorSet && isBackgroundColorSet;
    });

    setAvailableSets(availableSets);
  };

  useEffect(() => {
    generatePictures();
  }, [round]);

  useEffect(() => {
    calculateAvailableSets();
  }, [pictures]);

  return { pictures, availableSets };
}
