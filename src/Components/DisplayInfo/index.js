/*
 * import Bootstrap
 */
import Alert from "react-bootstrap/Alert";
/*
 *
 */
const DisplayInfo = ({ variant = "danger", airline, price, errorMsg }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-4 p-1">
      <Alert
        className="h4 text-primary border border-secondary"
        variant={variant}
      >
        {variant !== "danger"
          ? `The Best flight found is with ${airline}, € ${price}`
          : errorMsg}
      </Alert>
    </div>
  );
};
/*
 *
 */
export default DisplayInfo;
