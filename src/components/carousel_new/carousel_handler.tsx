import React, { HTMLAttributes } from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import { Carousel } from "./carousel";
import "./carousel_new.css";
import clsx from "clsx";

export interface CarouselHandlerProps extends HTMLAttributes<HTMLDivElement> {
  // show?: number
  rows?: number;
}

export const CarouselHandler = React.forwardRef<
  HTMLDivElement,
  CarouselHandlerProps
>((props, ref) => {
  const { rows = 1, ...restProps } = props;

  const str = [
    "https://via.placeholder.com/600x400?text=A",
    "https://via.placeholder.com/600x400?text=B",
    "https://via.placeholder.com/600x400?text=C",
    "https://via.placeholder.com/600x400?text=D",
    "https://via.placeholder.com/600x400?text=E",
    "https://via.placeholder.com/600x400?text=F",
    "https://via.placeholder.com/600x400?text=G",
    "https://via.placeholder.com/600x400?text=H",
  ];

  const num_col = rows;
  // group the elements into cols of num_rows
  const cols: string[][] = str.reduce(
    (acc: string[][], val: string, i: number) => {
      if (i % num_col === 0) {
        acc.push([val]);
      } else {
        acc[acc.length - 1].push(val);
      }
      return acc;
    },
    []
  );

  const calc_height = 100 / num_col;
  // map over the cols and render each col as a div containing X images
  const x: JSX.Element[] = cols.map((col: string[], colIndex: number) => {
    return (
      <div className={`h-full w-full`} key={colIndex}>
        <div
          className={` flex flex-col w-full rowH-${num_col}`}
          key={colIndex}
        >
          {col.map((element: string, index: number) => {
            return (
              <div className="w-full h-full" key={index}>
                <img
                  className={`w-full h-full object-cover py-2 px-2`}
                  src={`${element}`}
                  alt="placeholder image"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  return <Carousel {...props} children={x} />;
});
