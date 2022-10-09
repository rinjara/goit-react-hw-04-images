import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className="searchbar">
      <Formik initialValues={{ query: '' }} onSubmit={onSubmit}>
        <Form className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <Field
            className="input"
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Formik>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
