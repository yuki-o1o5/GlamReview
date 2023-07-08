import { Button } from "@mui/material";
import PropTypes from "prop-types";
import styled from "styled-components";

export function OutlinedButton({ valiant, type, onClick, children }) {
  return (
    <ColoredButton variant={valiant} type={type} onClick={onClick}>
      {children}
    </ColoredButton>
  );
}

OutlinedButton.propTypes = {
  valiant: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
};

const ColoredButton = styled(Button)`
  background: transparent !important;
  border: 1px solid ${(props) => props.theme.palette.secondary.dark};
  height: 30px !important;
  fontsize: 1rem !important;
  padding: 15px 20px !important;
  &:hover {
    background: ${(props) => props.theme.palette.secondary.dark} !important;
    color: #fff;
  }
`;
