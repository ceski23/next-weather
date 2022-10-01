import styled from '@emotion/styled';
import { ComponentProps, FC } from 'react';

type ButtonProps = ComponentProps<'button'>

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Container {...props}>
      {children}
    </Container>
  );
};

export default Button;

const Container = styled.button`
  background-color: ${props => props.theme.colors.backgroundAlt};
  border: none;
  padding: 10px 20px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color .3s;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
`;