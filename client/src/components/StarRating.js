import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

function StarRating(props) {
  let stars = [];
  let rate = props.rate / 2;

  for (let i = 0; i < 5; i++) {
    let el;
    if (rate - i > 0 && rate - i < 1) {
      el = <BsStarHalf key={i} className="text-warning" />;
    } else if (i < rate) {
      el = <BsStarFill key={i} className="text-warning" />;
    } else {
      el = <BsStar key={i}/>;
    }

    stars.push(el);
  }

  return <div>{stars}</div>;
}

export default StarRating;
