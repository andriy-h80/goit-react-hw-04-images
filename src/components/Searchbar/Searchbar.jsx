import { useState } from 'react';
import { Header, SearchForm, SearchFormBtn, SearchFormLabel, SearchFormInput } from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export default function Searchbar({ onSearchFormSubmit }) {
    const [value, setValue] = useState('')
   
    const handleChange = event => {
        setValue(event.currentTarget.value.toLowerCase());
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (value.trim() === '') {
            toast('What are you searching for?');
            return;
        };
        onSearchFormSubmit(value);
        setValue('');
    }

      return (
        <Header>
            <SearchForm onSubmit={handleSubmit}>
                <SearchFormBtn type='submit'>
                    <ImSearch size={20}/>
                    <SearchFormLabel>Search</SearchFormLabel>
                </SearchFormBtn>
                <SearchFormInput
                    className='input'
                    type='text'
                    autoComplete='off'
                    placeholder='Search images and photos'
                    value={value}
                    onChange={handleChange}
                />

            </SearchForm>
        </Header>
      );
  };

  Searchbar.propTypes = {
    onSearchFormSubmit: PropTypes.func.isRequired,
  };
  