import PropTypes from 'prop-types';
import './Section.modules.css';

export const Section = ({ children, title }) => {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">{title ? title : 'Your title'}</h1>
        {children}
      </div>
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};
