import React, { InputHTMLAttributes } from "react";

import classes from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    inputElement: {
      label: string,
      id: string,
      type: string,
      min: string,
      max: string,
      step: string,
      defaultValue: string,
    }
}


type Ref = HTMLInputElement

const Input: React.FC<{inputElement: InputProps["inputElement"]; ref: React.Ref<Ref> }> = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.inputElement.id}>{props.inputElement.label}</label>
      <input ref={ref} {...props.inputElement} />
    </div>
  );
});

export default Input;
