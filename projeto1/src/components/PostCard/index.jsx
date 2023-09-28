/* eslint-disable jsx-a11y/alt-text */
import "../../index.css";

import { Image } from "../Image";

export const PostCard = ({ image, title, body }) => {
  return (
    <div className="post">
      <Image url={image} />
      <span>{title}</span>
      <h3>{body}</h3>
    </div>
  );
};
