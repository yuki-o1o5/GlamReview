import { Button } from "@mui/material";
import PropTypes from "prop-types";
import styled from "styled-components";

export default function ContainedButton({ size, type, onClick, children }) {
  return (
    <ColoredButton size={size} type={type} onClick={onClick}>
      {children}
    </ColoredButton>
  );
}

ContainedButton.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
};

const ColoredButton = styled(Button)`
  background: ${(props) => props.theme.palette.secondary.main}!important;
  border: 0;
  height: 35px !important;
  fontsize: 1rem !important;
  padding: 15px 30px !important;
  &:hover {
    background: ${(props) => props.theme.palette.secondary.dark} !important;
    color: #fff;
  }
`;
