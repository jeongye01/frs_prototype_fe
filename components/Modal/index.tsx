import React from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';

export default function GoalAddModal() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();
  const className = {
    // size: 'pc:max-w-[890px] pc:max-h-[90vh] max-w-[320px] max-h-[470px]',
    size: 'pc:w-[890px] max-w-[90vw] pc:max-h-[80vh] w-[320px] max-h-[424px]',
    translate: '-translate-y-1/2 -translate-x-1/2',
  };

  return (
    <div
      className={`${className.size} ${className.translate} text-left pc:p-[72px] p-[26px] rounded-2xl relative  bg-modalGray overflow-auto`}
    >
      123
    </div>
  );
}
