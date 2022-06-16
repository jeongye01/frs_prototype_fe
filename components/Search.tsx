function Search() {
  return (
    <div className="px-2 rounded shadow bg-white">
      <form className="flex py-2 px-4 items-center">
        <span className="mr-3">인증요청일자</span>
        <DateInput />
        <span className="mx-3 text-xl">~</span>
        <DateInput />
        <span className="ml-5 mr-3">인증결과</span>

        <select className="px-2 py-2 outline-0 text-sm  text-gray-900 bg-[#F9F9F9] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
          <option selected>전체</option>
          <option value={1}>성공</option>
          <option value={0}>실패</option>
        </select>
        <button
          type="submit"
          className="text-white  bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 mx-2 "
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
        >
          초기화
        </button>
      </form>
    </div>
  );
}
export default Search;

function DateInput() {
  return (
    <div className="relative">
      <input
        type="search"
        id="default-search"
        className="block pl-5 py-2 outline-0  text-sm text-gray-900 bg-[#F9F9F9] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="ex) 2022-01-01"
        required
      />
      <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    </div>
  );
}
