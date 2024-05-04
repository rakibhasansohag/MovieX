import PropTypes from "prop-types";
import "./style.scss";

const ContentWrapper = ({ children }) => {
  return <div className=" contentWrapper">{children}</div>;
};

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContentWrapper;

// V1 code =>  if the v2 code doesn't work will use this
// import "./style.scss";

// const ContentWrapper = ({ children }) => {
//   return <div className="content-wrapper">{children}</div>;
// };

// export default ContentWrapper;
