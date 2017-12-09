import React from 'react';
import './DescriptionBox.css';


export const DescriptionBox = (props) => {
  return <input
    placeholder={props.description}
    onFocus={props.onFocus}
  />;
}
