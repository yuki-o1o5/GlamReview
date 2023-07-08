import { InputBase, Paper } from "@mui/material";
import styled from "styled-components";
import PropTypes from "prop-types";

export const UserInput = ({
  placeholder,
  type,
  register,
  label,
  pattern,
  autoComplete,
}) => {
  return (
    <StyledPaper>
      <StyledInputBase
        placeholder={placeholder}
        type={type}
        fullWidth
        {...register(label, {
          required: true,
          pattern: pattern,
        })}
        autoComplete={autoComplete}
      />
    </StyledPaper>
  );
};

UserInput.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  register: PropTypes.any,
  label: PropTypes.any,
  pattern: PropTypes.any,
  autoComplete: PropTypes.string,
};

const StyledPaper = styled(Paper)`
  padding: 6px;
`;

const StyledInputBase = styled(InputBase)`
  font-size: 13px;
`;
