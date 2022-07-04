import { useState } from 'react';
import AdminNavbar from 'components/AdminNavbar';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState('-left-64');
  const activeClassName = `bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md`;
  const router = useRouter();
  return (
    <div
      className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
    >
      <ProSidebar width="100%">
        <SidebarHeader className="bg-white">
          <Link href="/">
            <a className="mt-2 text-center w-full inline-block bg-light-blue-500 shadow-xl rounded">
              <Image
                src="/img/logo_cubox_w.png"
                alt="brand_logo"
                width={170}
                height={56}
              />
            </a>
          </Link>
          <hr className="my-4 min-w-full" />
        </SidebarHeader>
        <SidebarContent className="bg-white">
          <Menu iconShape="square" className="bg-white">
            <MenuItem>Dashboard</MenuItem>
            <SubMenu title="Components" className="bg-white">
              <MenuItem className="bg-white">Component 1</MenuItem>
              <MenuItem className="bg-white">Component 2</MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          {/**
           *  You can add a footer for the sidebar ex: copyright
           */}
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
}
/*

   <AdminNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div
        className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
      >
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <Link href="/">
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
              <div className="h-20 bg-red-400 animate-toggleSlider">123</div>
              <li className=" rounded-lg mb-4">
                <Link href="/users">
                  <a
                    className={`flex items-center gap-4 text-sm text-gray-700 font-light text-gray-500 px-4 py-3 rounded-lg ${
                      router.pathname === '/users' && activeClassName
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
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    사용자 관리
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>*/
