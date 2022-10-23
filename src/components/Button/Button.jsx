import PropTypes from 'prop-types';
import { ButtonWrapper, StyledButton } from './Button.styled';

export const Button = ({ onClick, children }) => {
  return (
    <ButtonWrapper>
      <StyledButton type="button" onClick={() => onClick()}>
        {children}
      </StyledButton>
    </ButtonWrapper>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};
