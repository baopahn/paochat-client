import { IconButton } from "components/Button/Button";
import { Text } from "components/Layout/ElementCustom";
import React, { useRef, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useAppDispatch } from "state";
import useSearch from "state/hooks/useSearch";
import { fetchSearch, setIsSearch } from "state/searchs";
import styled from "styled-components";

const SearchWrap = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  box-shadow: 0 1px 5px ${({ theme }) => theme.border};
`;

const Label = styled(Text)`
  height: 40px;
  font-weight: 600;
  font-size: 24px;
  line-height: 40px;
`;

const SearchContainer = styled.div`
  display: flex;
`;

const BackButton = styled(IconButton)<{ isShow: boolean }>`
  display: ${({ isShow }) => (isShow ? "flex" : "none")};
  margin-right: 10px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  height: 35px;
  flex: 1;
  background-color: ${({ theme }) => theme.border};
  border-radius: 20px;
  color: ${({ theme }) => theme.text};
  padding: 10px 20px;
  text-overflow: ellipsis;
`;

const Search = () => {
  const dispatch = useAppDispatch();
  const { isSearch } = useSearch();
  const handleSetIsSearch = (s) => dispatch(setIsSearch(s));

  const [key, setKey] = useState<string>("");
  const typingTimeout = useRef(null);
  const handleChangeInput = ({ target }) => {
    setKey(target.value);

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(
      () => dispatch(fetchSearch(target.value)),
      600
    );
  };

  const handleBack = () => {
    handleSetIsSearch(false);
  };

  return (
    <SearchWrap>
      <Label>Chat</Label>
      <SearchContainer>
        <BackButton isShow={isSearch} onClick={handleBack}>
          <IoArrowBackOutline />
        </BackButton>
        <SearchInput
          value={key}
          onChange={handleChangeInput}
          placeholder="Search..."
          onClick={() => handleSetIsSearch(true)}
        />
      </SearchContainer>
    </SearchWrap>
  );
};

export default Search;
