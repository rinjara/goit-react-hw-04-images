import { Formik } from 'formik';
import PropTypes from 'prop-types';
import {
  StyledSearchbar,
  StyledForm,
  SearchFormButton,
  StyledField,
} from './Searchbar.styled';
import { toast } from 'react-toastify';
import { MdImageSearch } from 'react-icons/md';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = async (value, actions) => {
    if (value.query.trim() === '') {
      toast.error('You need to enter something to start searching!');
      return;
    }
    await onSubmit(value.query);
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <StyledSearchbar>
      <Formik initialValues={{ query: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => {
          return (
            <StyledForm>
              <SearchFormButton type="submit" disabled={isSubmitting}>
                <MdImageSearch size="2em" />
              </SearchFormButton>

              <StyledField
                type="text"
                name="query"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
              />
            </StyledForm>
          );
        }}
      </Formik>
    </StyledSearchbar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
