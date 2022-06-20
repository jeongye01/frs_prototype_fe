import React, { useState } from 'react';
import Table, { BaseTbodyRowStyle } from 'components/Table';

const fields = [
  '순번',
  '사용자 아이디',
  '사용자 이름',
  '권한 코드',
  '권한 이름',
  '암호 변경 여부',
  '암호 오류 횟수',
  '마지막 접속 일시',
  '등록일자',
  '권한',
  '사용여부',
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
        <td>123</td>
      ))}
    </>
  );
}
function User() {
  return <Table fields={fields} rows={} />;
}

export default User;
/*

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




*/
