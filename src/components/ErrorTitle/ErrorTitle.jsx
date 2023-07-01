import PropTypes from 'prop-types';

function ErrorTitle({ error }) {
  return (
    <pre style={{ textAlign: "left" }} > Something went wrong,
      <code>
        {JSON.stringify(error, null, 2)}
      </code>
    </pre>
  )
}

ErrorTitle.propTypes = {
  error: PropTypes.any,
};

export default ErrorTitle