import React from 'react';
import './Button.css';


export const Button = (props) => {
  return <a className="button" onClick={props.onClick}>Generate a new name!</a>;
}
