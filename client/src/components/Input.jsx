import { FormControl, OutlinedInput } from "@mui/material";
import styled from "styled-components";
import PropTypes from "prop-types";

export const Input = ({
  value,
  type,
  placeholder,
  onChange,
  multiline,
  rows,
}) => {
  return (
    <StyledFormControl fullWidth>
      <OutlinedInput
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        multiline={multiline}
        rows={multiline ? rows : ""}
      />
    </StyledFormControl>
  );
};

Input.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
};

const StyledFormControl = styled(FormControl)`
  .MuiOutlinedInput-root {
    fieldset {
      border-color: ${(props) => props.theme.palette.secondary.dark};
    }
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => props.theme.palette.secondary.dark};
    }
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => props.theme.palette.secondary.dark};
    }
  }
`;
