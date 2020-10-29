import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ options, selected, onSelectedChange, label }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      if (!ref.current.contains(event.target)) {
        setOpen(false); // Se clickar no body, mas fora do form => fecha
      }
    };
    document.body.addEventListener("click", onBodyClick);

    return () => {
      document.body.removeEventListener("click", onBodyClick);
      // O return só é chamado logo antes do próximo rerender, então ele remove e adiciona os EventListeners rapidamente toda vez.
      // Entretanto, se o Dropdown todo for fechado, só o remove que vai ser chamado.
      // Quando o toggle do app é ativado, o dropdown é rendered de novo e o useEffect adiciona o EventListener.
    };
  }, []);

  const renderedOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div
        key={option.value}
        className="item"
        onClick={() => onSelectedChange(option)}
      >
        {option.label}
      </div>
    );
  });
  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? "visible transition" : ""}`}>
            {renderedOptions}
          </div>
        </div>
        <h1 style={{ color: selected.value }}>This text is {selected.value}</h1>
      </div>
    </div>
  );
};

export default Dropdown;
