import { useAppSelector, useAppDispatch } from 'hooks/redux';
import resultSlice, { IResult } from 'store/slices/resultSlice';

export default function useGetActionState(
  actionType: string,
): [boolean, IResult, () => void] {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector(state => state.loading);
  const { result } = useAppSelector(state => state.result);
  const loadingState: boolean = loading[actionType];
  const resultState: IResult = result[actionType];

  const initResult = () => {
    dispatch(resultSlice.actions.initResult(actionType));
  };

  return [loadingState, resultState, initResult];
}

/*


*/
