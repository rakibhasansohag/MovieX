import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Img = ({ src, className }) => {
  return (
    <LazyLoadImage
      className={className || ""}
      alt={src?.title || "lazy Images"}
      effect="blur" // opacity effect
      src={src}
    />
  );
};

Img.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Img;

///  v1 code =>  if the v2 code doesn't work will use this
// import React from "react";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";

// const Img = ({ src, className }) => {
//     return (
//         <LazyLoadImage
//             className={className || ""}
//             alt=""
//             effect="blur"
//             src={src}
//         />
//     );
// };

// export default Img;
