import React from "react";
import { Link } from "react-router-dom";


export function Notfound() {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>
        <span className="error">ERROR</span><br/>
        <span>Page Not Found</span>
      </p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
}
