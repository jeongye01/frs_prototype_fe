import modalSlice, { ModalComponentState } from 'store/slices/modalSlice';
import React, { useEffect, useRef, Suspense } from 'react';
import modalList from 'utils/importModal';
import { useAppSelector, useAppDispatch } from 'hooks/redux';

export default function ModalSection() {
  const modalRef = useRef<HTMLDivElement>(null);
  const { openList, isOpenModal } = useAppSelector(state => state.modal);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isOpenModal) {
      document.body.style.cssText = `
			  position: fixed;
			  overflow: hidden;
			  width: 100%;
			  height: 100%
			`;
    }
  }, [isOpenModal]);

  const handleModalClick = (e: React.BaseSyntheticEvent | MouseEvent) => {
    const { current } = modalRef;
    const { target } = e;

    if (current !== null && (!current.contains(target) || current === target)) {
      // closeModal();
      dispatch(modalSlice.actions.close());
      document.body.style.cssText = '';
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        className={`absolute top-0  left-0 z-50 w-full h-full ${
          isOpenModal ? '' : 'hidden'
        }`}
        onClick={handleModalClick}
        aria-hidden
      >
        <div className="absolute  w-full h-full z-999 bg-black bg-opacity-50" />
        <div className="relative  top-1/2 translate-x-1/2" ref={modalRef}>
          {openList.map(({ name, props }: ModalComponentState) => {
            const config = modalList.find(ele => {
              return ele.name === name;
            });
            if (!config || !config.component) return null;
            const ModalComponent = config.component;
            // eslint-disable-next-line react/jsx-props-no-spreading
            return <ModalComponent {...props} />;
          })}
        </div>
      </div>
    </Suspense>
  );
}
