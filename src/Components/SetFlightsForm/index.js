import { useState, useEffect } from 'react';
/*
 * Local styles import
 */
import './styles.css';
/*
 * import Bootstrap
 */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



/*
 *
 */

const SetFlightForm = ({ findFlight }) => {
    console.log('SetFlightForm - component')
    /*
     * 
     */
    const [formData, setFormData] = useState({
        departureAirport: '',
        arrivalAirport: '',

    });
    const { departureAirport, arrivalAirport } = formData
    /**
     * 
     * @param {*} evt 
     */
    const hanlderFormFields = evt => {
        console.log('SetFlightForm hanlderFormFields');
        let { name, value } = evt.currentTarget;
        console.log('SetFlightForm hanlderFormFields', name, value);
        setFormData({ ...formData, [name]: value });
    };
    /*
     *
     */
    const handlerSubmit = (evt) => {
        console.log('SetFlightForm - handlerSubmit', formData);
        evt.preventDefault();
        /* enableSpinner(true)*/
        findFlight(formData)
        //  getFormData(formData);
    };
    /*
     *
     *
  
  
      /*
       * 
       */
    const resetField = () => {
        console.log('SetFlightForm - resetField');
        setFormData({
            departureAirport: '',
            arrivalAirport: '',
        })
    }
    /*
     * 
     */
    useEffect(() => {
        console.log('SetFlightForm  - useEffect', departureAirport, arrivalAirport);
    }, [departureAirport, arrivalAirport])
    /*
     * 
     */
    return (
        <div className="mainFormContainer">
            <Row>
                <Col md={3} />
                <Col md={6}>
                    <Form
                        onSubmit={handlerSubmit}
                        style={{
                            backgroundColor: 'lightgray',
                            border: '1px solid black',
                            borderRadius: '10px',
                        }}
                        className='py-5'
                    >

                        <Row>
                            <Col xs={3} md={2} />
                            <Col xs={6} md={8}>
                                <Form.Control
                                    onChange={hanlderFormFields}
                                    className='text-center'
                                    required
                                    placeholder={'Departure airport IATA code'}
                                    name='departureAirport'
                                    value={departureAirport}
                                />
                            </Col>
                            <Col xs={3} md={2} />
                        </Row>
                        <Row style={{ height: '40px' }} />


                        <Row>
                            <Col xs={3} md={2} />
                            <Col xs={6} md={8}>
                                <Form.Control

                                    onChange={hanlderFormFields}
                                    className='text-center'
                                    required
                                    placeholder={'Arrival airport IATA code'}
                                    name='arrivalAirport'
                                    value={arrivalAirport}
                                />
                            </Col>
                            <Col xs={3} md={2} />
                        </Row>
                        <Row style={{ height: '20px' }} />
                        <Row style={{ height: '40px' }} />
                        <Row>
                            <Col xs={3} md={2} />
                            <Col xs={6} md={8}>
                                <Button
                                    disabled={departureAirport.length > 0 && arrivalAirport.length > 0 ? false : true}
                                    type='input'
                                    variant={'success'}
                                    block
                                >
                                    {'Find'}
                                </Button>

                                <Button onClick={resetField} type='button' variant={'danger'} block>
                                    {'Reset'}
                                </Button>

                            </Col>

                            <Col xs={3} md={2} />
                        </Row>
                    </Form>
                </Col>
                <Col xs={3} md={6} />
            </Row>
        </div >
    );
}
/*
 * 
 */
export default SetFlightForm;