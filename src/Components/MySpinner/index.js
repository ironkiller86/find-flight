/*
 * import Bootstrap
 */
import Spinner from 'react-bootstrap/Spinner';

const MySpinner = () => {
    return (<div style={{ display: 'flex', justifyContent: 'center', zIndex: '5' }}>
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner></div>)

}
export default MySpinner;