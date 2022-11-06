import styled from '@emotion/styled';
import { ComponentProps, FC } from 'react';
import { Search } from 'react-feather';

interface SearchInputProps extends Omit<ComponentProps<'input'>, 'onChange'> {
  onChange: (value: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ onChange, value, ...props }) => (
  <SearchWrapper>
    <SearchIcon />
    <Input
      type='search'
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
      {...props}
    />
  </SearchWrapper>
);

export default SearchInput;

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  font-family: Poppins, sans-serif;
  padding: 10px 10px;
  border: none;
  border-radius: 10px;

  &::placeholder {
    color: ${props => props.theme.colors.textAlt};
  }

  outline-color: ${props => props.theme.colors.primaryDark};
`;

const SearchIcon = styled(Search)`
  color: ${props => props.theme.colors.text};
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
  width: 100%;
`;