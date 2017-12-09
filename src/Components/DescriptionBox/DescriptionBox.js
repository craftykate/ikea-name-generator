import React from 'react';
import './DescriptionBox.css';


export const DescriptionBox = (props) => {
  return <textarea
    placeholder={props.description}
    onFocus={props.onFocus}>
  </textarea>;
}
