import React from "react";

// Faz a página "fingir" que dá um refresh mas só renderiza
const Link = ({ className, href, children }) => {
  const onClick = (event) => {
    if (event.metaKey || event.ctrlKey) { // evita a função se o control tiver apertado
      return;
    }

    event.preventDefault(); // Não deixa a página dar refresh
    window.history.pushState({}, "", href); // Altera a url mesmo sem o refresh

    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent); // Da um rerender mesmo sem o refresh da página
  };

  return (
    <a onClick={onClick} className={className} href={href}>
      {children}
    </a>
  );
};

export default Link;
