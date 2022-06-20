export default function UserMgtModal() {
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
      </form>
    </div>
  );
}
