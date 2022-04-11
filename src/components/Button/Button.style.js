import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #303134;
  border: 1px solid #303134;
  border-radius: 4px;
  color: #e8eaed;
  font-family: 'Noto Sans KR', 'Roboto', sans-serif;
  font-size: 14px;
  margin: 11px 4px;
  padding: 0 16px;
  line-height: 27px;
  height: 36px;
  min-width: 54px;
  text-align: center;
  cursor: pointer;

  &:hover {
    box-shadow: 0 1px 3px #1717173d;
    background-color: #303134;
    border: 1px solid #5f6368;
    color: #e8eaed;
  }

  &:focus {
    outline: none;
  }
`;

export default StyledButton;