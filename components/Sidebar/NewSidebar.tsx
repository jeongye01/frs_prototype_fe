import { useState, useReducer } from 'react';
import AdminNavbar from 'components/AdminNavbar';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import 'react-pro-sidebar/dist/css/styles.css';
export interface IMenu {
  opManage: boolean;
  history: boolean;
}
export interface Action {
  type: 'opManage' | 'history' | 'init';
  payload?: boolean;
}
const initialState: IMenu = {
  opManage: false,
  history: false,
};

function reducer(state: IMenu, action: Action) {
  if (action.type === 'init') return initialState;
  return { ...initialState, [action.type]: action.payload };
}

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState('-left-64');
  const [navState, navDispatch] = useReducer(reducer, initialState);
  const activeClassName = `bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md`;
  const router = useRouter();
  return (
    <>
      <AdminNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div
        className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
      >
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <Link onClick={() => navDispatch({ type: 'init' })} href="/">
            <a className="mt-2 text-center w-full inline-block bg-light-blue-500 shadow-xl rounded">
              <Image
                src="/img/logo_cubox_w.png"
                alt="brand_logo"
                width={170}
                height={56}
              />
            </a>
          </Link>

          <div className="flex flex-col">
            <hr className="my-4 min-w-full" />

            <ul className="flex-col min-w-full flex list-none collapse">
              <li className="rounded-lg mb-4">
                <ul>
                  <li>
                    <Link href="/history">
                      <a
                        className={`flex items-center gap-4 text-sm text-gray-700 font-light text-gray-500 px-4 py-3 rounded-lg ${
                          router.pathname === '/history' && activeClassName
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        인증 이력조회
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className=" rounded-lg mb-4  px-4 ">
                <button
                  onClick={() =>
                    navDispatch({
                      type: 'opManage',
                      payload: !navState.opManage,
                    })
                  }
                  className="flex w-full  items-center justify-between text-sm text-gray-700 font-light text-gray-500py-3 rounded-lg"
                >
                  <div className="flex items-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span>운영 관리</span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-\5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <ul
                  className={`${activeClassName} rounded px-2  ${
                    navState.opManage ? 'max-h-fit py-1' : 'max-h-0 '
                  }  overflow-hidden transition-all ease-in-out mt-2`}
                >
                  <li className="py-1">
                    <Link href="/operation/users">
                      <a
                        className={`text-white ${
                          router.pathname === '/operation/users' &&
                          'underline underline-offset-4   decoration-2'
                        }`}
                      >
                        사용자 관리
                      </a>
                    </Link>
                  </li>
                  <li className="py-1">
                    <Link href="/operation/author">
                      <a
                        className={`text-white ${
                          router.pathname === '/operation/author' &&
                          'underline underline-offset-4   decoration-2'
                        }`}
                      >
                        권한 관리
                      </a>
                    </Link>
                  </li>
                  <li className="py-1">
                    <Link href="/operation/menu">
                      <a
                        className={`text-white ${
                          router.pathname === '/operation/menu' &&
                          'underline-offset-8'
                        }`}
                      >
                        메뉴 관리
                      </a>
                    </Link>
                  </li>
                  <li className="py-1">
                    <Link href="/operation/author-menu">
                      <a
                        className={`text-white ${
                          router.pathname === '/operation/author-menu' &&
                          'underline underline-offset-4   decoration-2'
                        }`}
                      >
                        권한별 메뉴 관리
                      </a>
                    </Link>
                  </li>
                  <li className="py-1">
                    <Link href="/operation/code">
                      <a
                        className={`text-white ${
                          router.pathname === '/operation/code' &&
                          'underline-offset-8'
                        }`}
                      >
                        코드 관리
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
/*

 */

/*

  <div className="bg-white">
        <button onClick={() => setClick(prev => !prev)}>anim!</button>
        <div
          className={`bg-blue-400 ${
            click ? 'max-h-0' : 'max-h-6'
          }  overflow-hidden transition-all`}
        >
          <div className="bg-black">Component 1</div>
          <div className="bg-black">Component 2</div>
        </div>
      </div>

      */
