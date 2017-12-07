import React from 'react';
import './Button.css';


export const Button = (props) => {
  return <button onClick={props.onClick}>Generate a new name!</button>;
}
