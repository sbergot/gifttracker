import * as React from "react"

export function RadioButtonField(props: {
    title: string;
    key: keyof GT.Gift;
    options: string[];
    selected: string;
    onChange: (option: string) => void;
}) {
    const fieldid = "gift-edit-" + props.key;
    return <>
    <label className="form-label" htmlFor={fieldid}>{props.title}</label>
    {
      props.options.map((option) => (
        <button
          key={option}
          className={`btn ${option === props.selected ? 'btn-primary' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            props.onChange(option);
          }}
        >
          {option}
        </button>
      ))
    }
  </>
}