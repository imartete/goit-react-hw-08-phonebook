import PropTypes from 'prop-types';

export const Notification = ({ message }) => {
  return (
    <div>
      <p>{message ? message : 'Your notification'}</p>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
};
