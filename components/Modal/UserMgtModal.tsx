import useModal from 'hooks/useModal';
import { modalName } from 'utils/importModal';

export interface IForm {
  pageSize: number | null;
  page: number | null;
  searchDateFrom: string | null;
  searchDateTo: string | null;
  resultCd: 1 | 0 | -1;
}
export interface Action {
  type:
    | 'countPerPage'
    | 'page'
    | 'searchDateFrom'
    | 'searchDateTo'
    | 'resultCd';
  payload: string | number | null;
}
const initialState: IForm = {
  pageSize: 20,
  page: 0,
  searchDateFrom: null,
  searchDateTo: null,
  resultCd: -1,
};
function formReducer(state: IForm, action: Action) {
  return { ...state, [action.type]: action.payload };
}

export default function UserMgtModal() {
  const [_, closeUserMgtModal] = useModal();
  return (
    <div className="w-1/4 -translate-x-1/2 -translate-y-1/2 bg-white text-center border p-10">
      <form className=" space-y-4">
        <div className="flex">
          <span className=" w-1/6 grid place-items-center  text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md ">
            아이디
          </span>
          <input
            type="text"
            className="outline-none rounded-none rounded-r-lg bg-gray-50 border  text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  "
          />
        </div>
        <div className="flex">
          <span className="w-1/6  grid place-items-center text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md ">
            비밀번호
          </span>
          <input
            type="text"
            className="outline-none rounded-none rounded-r-lg bg-gray-50 border  text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  "
          />
        </div>
        <div className="flex">
          <span className="w-1/6  grid place-items-center text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md ">
            권한
          </span>
          <select className="px-2 py-2 outline-0 text-sm  text-gray-900 bg-[#F9F9F9] rounded-r-lg w-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0  p-2.5">
            <option value={-1} selected>
              전체관리자
            </option>
            <option value={1}>운영자</option>
            <option value={0}>관리담당자</option>
          </select>
        </div>
        <div className="space-x-3">
          <button className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
            저장
          </button>
          <button
            onClick={() => closeUserMgtModal({ name: modalName.UserMgtModal })}
            className="text-white bg-gray-700 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
