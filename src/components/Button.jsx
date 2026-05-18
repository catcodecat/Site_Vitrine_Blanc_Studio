import { Link } from "react-router-dom";

function Button({ children, to, type = "button", variant = "primary" }) {
  const className = `button button-${variant}`;

  if (to) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} type={type}>
      {children}
    </button>
  );
}

export default Button;
