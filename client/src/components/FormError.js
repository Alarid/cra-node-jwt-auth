import React from 'react';
import PropTypes from 'prop-types';

const FormError = ({error}) => {
  return (
    <div className="alert alert-danger mt-1" role="alert">
      {error}
    </div>
  );
};

FormError.propTypes = {
  error: PropTypes.string,
};
FormError.defaultProps = {
  error: "This field is required.",
};

export default FormError;