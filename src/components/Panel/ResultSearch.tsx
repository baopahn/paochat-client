import { Img, Text } from "components/Layout/ElementCustom";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import useSearch from "state/hooks/useSearch";
import styled from "styled-components";

const ResultSearchWrap = styled.div<{ isShow: boolean }>`
  position: absolute;
  width: 100%;
  top: 0;
  left: ${({ isShow }) => (isShow ? "0" : "100%")};
  transition: all 0.3s;
  padding: 10px;
`;

const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
  border-radius: 10px;
  transition: all 0.1s;
  cursor: pointer;

  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  &:hover {
    background-color: ${({ theme }) => theme.border};
  }
`;

const SearchResultAvatar = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 50px;
  height: 50px;
`;

const UserInfo = styled.div`
  overflow: hidden;
  flex: 1;
  margin-left: 10px;
`;

const UserName = styled(Text)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 30px;
  font-weight: 600;
`;

const UserEmail = styled(Text)`
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ResultLabel = styled(Text)`
  width: 100%;
  text-align: center;
`;

const ResultSearch = () => {
  const { isSearch, result } = useSearch();

  const renderResult = useMemo(() => {
    if (result.length === 0) return <ResultLabel>Search...</ResultLabel>;

    return result.map((user) => (
      <Link to={`/profile/${user._id}`} key={user._id}>
        <SearchResultItem>
          <SearchResultAvatar>
            <Img src={user.avatar} />
          </SearchResultAvatar>
          <UserInfo>
            <UserName>{user.fullName}</UserName>
            <UserEmail>{user.email}</UserEmail>
          </UserInfo>
        </SearchResultItem>
      </Link>
    ));
  }, [result]);

  return <ResultSearchWrap isShow={isSearch}>{renderResult}</ResultSearchWrap>;
};

export default ResultSearch;
