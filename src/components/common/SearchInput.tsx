import styled from '@emotion/styled';
import { ChangeEvent, ComponentProps, FC, useMemo, useState } from 'react';
import { Search } from 'react-feather';
import debounce from 'lodash.debounce';

interface SearchInputProps extends ComponentProps<'input'> {
  onDebouncedChange: (value: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ onDebouncedChange, defaultValue, ...props }) => {
  const [value, setValue] = useState(defaultValue);
  const debouncedChangeHandler = useMemo(() => (
    debounce(onDebouncedChange, 500)
  ), [onDebouncedChange]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setValue(value);
    debouncedChangeHandler(value);
  }

  return (
    <SearchWrapper>
      <SearchIcon />
      <Input
        type='search'
        value={value}
        onChange={handleChange}
        {...props}
      />
    </SearchWrapper>
  );
};

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