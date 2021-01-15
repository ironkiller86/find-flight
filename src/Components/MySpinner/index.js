/*
 * import Bootstrap
 */
import Spinner from 'react-bootstrap/Spinner';

const MySpinner = () => {
    return (
        <div className="d-flex flex-row mt-3">
            <div className='w-25' />
            <div className='w-50 d-flex justify-content-center align-items-center'>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
            <div />
        </div>)

}
export default MySpinner;