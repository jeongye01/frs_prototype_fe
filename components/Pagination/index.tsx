/* eslint-disable react/no-array-index-key */
import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { IconButton } from '@material-tailwind/react';
interface Props {
  numOfPages: number;
  numOfPageBtn: number;
  setCurPage: React.Dispatch<React.SetStateAction<number>>;
  curPage: number;
}

/*
   isActive={slideNum > 1}
        arrDirection="left"
        onClick={() => {
          if (slideNum <= 1) return;
          setSlideNum(prev => prev - 1);
          setCurPage(1 + (slideNum - 2) * numOfPageBtn);
        }}




          btnType="arrow"
        isActive={slideNum < Math.ceil(numOfPages / numOfPageBtn)}
        arrDirection="right"
        onClick={() => {
          if (slideNum >= Math.ceil(numOfPages / numOfPageBtn)) return;
          setSlideNum(prev => prev + 1);
          setCurPage(1 + slideNum * numOfPageBtn);
        }}

*/
function Pagination({ numOfPages, setCurPage, curPage, numOfPageBtn }: Props) {
  const [slideNum, setSlideNum] = useState<number>(1);

  return (
    <div className="w-full flex justify-center items-center space-x-2">
      <IconButton
        onClick={() => {
          if (slideNum <= 1) return;
          setSlideNum(prev => prev - 1);
          setCurPage(1 + (slideNum - 2) * numOfPageBtn);
        }}
      >
        <svg
          className={`w-5 h-5`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </IconButton>
      {[...Array(numOfPageBtn)].map((_, idx) => {
        const btnNum = idx + 1 + (slideNum - 1) * numOfPageBtn;
        // eslint-disable-next-line react/no-array-index-key
        if (btnNum > numOfPages) return null;

        return (
          <IconButton
            variant="outlined"
            key={btnNum}
            onClick={() => setCurPage(btnNum)}
          >
            {btnNum}
          </IconButton>
        );
      })}
      <IconButton
        onClick={() => {
          if (slideNum >= Math.ceil(numOfPages / numOfPageBtn)) return;
          setSlideNum(prev => prev + 1);
          setCurPage(1 + slideNum * numOfPageBtn);
        }}
      >
        <svg
          className={`w-5 h-5 `}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </IconButton>
    </div>
  );
}

export default Pagination;

/*



   {[...Array(numOfPageBtn)].map((_, idx) => {
        const btnNum = idx + 1 + (slideNum - 1) * numOfPageBtn;
        // eslint-disable-next-line react/no-array-index-key
        if (btnNum > numOfPages) return null;

        return (
          <Button
            key={btnNum}
            btnType="number"
            isActive={curPage === btnNum}
            number={btnNum}
            onClick={() => setCurPage(btnNum)}
          />
        );
      })}
      <Button
        btnType="arrow"
        isActive={slideNum < Math.ceil(numOfPages / numOfPageBtn)}
        arrDirection="right"
        onClick={() => {
          if (slideNum >= Math.ceil(numOfPages / numOfPageBtn)) return;
          setSlideNum(prev => prev + 1);
          setCurPage(1 + slideNum * numOfPageBtn);
        }}
      />

*/
