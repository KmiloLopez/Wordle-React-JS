import styled from "styled-components";

export const StyledBox = styled.div`
  background-color: ${(props) =>
    props.color == 0
      ? "gray"
      : props.color == 1
      ? "yellow"
      : props.color == 2
      ? "green"
      : "white"};
  width: 80px;
  height: 80px;
  border: 2px solid black;
  border-radius: 4px;
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
`;

export const StyledButton = styled.button`
  margin-top: 15px;
  font-size: x-large;
  cursor: pointer;
  &:hover {
    background-color: lightseagreen;
  }
`;
