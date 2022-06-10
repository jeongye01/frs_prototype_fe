import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import NotificationDropdown from 'components/Dropdowns/NotificationDropdown';
import UserDropdown from 'components/Dropdowns/UserDropdown';

export default function Sidebar() {
  return (
    <nav className="fixed z-50 top-0 bottom-0 left-0 bg-[#3b75e3] font-light divide-y divide-[#213a84]">
      <div className="p-5">
        <Link href="/">
          <a>
            <Image
              src="/img/logo_cubox_w.png"
              alt="brand_logo"
              width={170}
              height={56}
            />
          </a>
        </Link>
      </div>
      <ul className="divide-y divide-[#213a84]">
        {['홈', '현황 관리', '운영 관리'].map(title => (
          <li className="py-3 px-5 text-center flex justify-between items-center  ">
            <div className="text-center flex items-center  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>

              <span className="text-white text-sm "> {title}</span>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-[#213a84]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </li>
        ))}
      </ul>
      <div className="absolute left-[10px] bottom-0"></div>
    </nav>
  );
}
