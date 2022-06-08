import React, { useState } from 'react';
import Table, { BaseTbodyRowStyle } from 'components/Table';

const fields = [
  '순번',
  '아이디',
  '이름',
  '권한',
  '마지막접속일시',
  '암호오류횟수',
  '암호변경여부',
  '암호변경경과일수',
  '등록일자',
  '사용여부',
  '편집',
  '비밀번호',
];

const values = [
  {
    order: '1',
    id: 'dev',
    name: '개발자SH',
    authority: '전체관리자',
    lastAccessDate: '2022-06-08 09:58:59',
    passwordErrorCount: '0',
    isPasswordChanged: 'Y',
    passwordChangeDays: '30',
    registerDate: '2021-10-14',
    isUsed: '사용중',
    edit: '편집',
    password: '초기화',
  },
];

function UserRow() {
  const [isUsed, setIsUsed] = useState(true);
  const onUseButtonClick = () => {
    setIsUsed(prev => !prev);
  };
  return (
    <>
      {Object.values(values[0]).map((value, i) => (
        <td
          className={`${BaseTbodyRowStyle} relative ${
            i === 9 || i === 10 ? 'text-blue-800' : ''
          }  ${i === 11 ? 'text-green-800' : ''} `}
        >
          {i < 9 && <>{value}</>}
          {i === 9 && (
            <button
              onClick={onUseButtonClick}
              className={`${
                isUsed ? 'bg-[#225ccb]' : 'bg-[#666666]'
              } text-white p-1 rounded absolute -translate-x-1/2 -translate-y-1/2 `}
            >
              {isUsed ? '사용중' : '사용안함'}
            </button>
          )}
          {i === 10 && (
            <button
              onClick={onUseButtonClick}
              className={`bg-[#225ccb] text-white p-1 rounded ${
                isUsed ? '' : 'invisible'
              }`}
            >
              {value}
            </button>
          )}
          {i === 11 && (
            <button
              className={`bg-[#00a7a4] text-white p-1 rounded ${
                isUsed ? '' : 'invisible'
              }`}
            >
              {value}
            </button>
          )}
        </td>
      ))}
    </>
  );
}
function User() {
  return <Table fields={fields} tbodyRow={<UserRow />} />;
}

export default User;
