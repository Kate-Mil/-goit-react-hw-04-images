import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [searchForm, setSearchForm] = useState('');

  const hendleSerchFormChange = e => {
    setSearchForm(e.currentTarget.value.toLowerCase().trim());
  };

  const hendleSubmit = e => {
    e.preventDefault();

    if (searchForm.trim() === '') {
      alert('Please enter, what exactly you want to find?');
      return;
    }
    onSubmit(searchForm);
    setSearchForm('');
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={hendleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchForm}
          onChange={hendleSerchFormChange}
        />
      </SearchForm>
    </SearchBar>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
