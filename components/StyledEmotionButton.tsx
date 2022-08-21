import styled from '@emotion/styled';

interface IButtonProps {
  backgroundColor: string;
}

const Button = styled.button<IButtonProps>`
  padding: 4px;
  margin: 8px;
  background-color: ${(props) => props.backgroundColor};
  font-size: 16px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`;

const StyledEmotionButton = (props: { children: string, backgroundColor: string }) => {
  return <Button backgroundColor={props.backgroundColor}>Emo</Button>;
};

export default StyledEmotionButton;