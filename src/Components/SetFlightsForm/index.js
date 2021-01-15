import { useState, useEffect } from "react";
/*
 * Local styles import
 */
import "./styles.css";
/*
 * import Bootstrap
 */
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
/*
 *
 */
const SetFlightForm = ({ findFlight, airportData, closeDisplayInfo }) => {
  console.log("SetFlightForm - component");
  const [formData, setFormData] = useState({
    departureAirport: "",
    arrivalAirport: "",
  });
  const { departureAirport, arrivalAirport } = formData;
  /**
   *
   * @param {*} evt
   */
  const handlerFormFields = (evt) => {
    console.log("SetFlightForm handlerFormFields");
    let { name, value } = evt.currentTarget;
    console.log("SetFlightForm handlerFormFields", name, value);
    setFormData({ ...formData, [name]: value });
  };
  /*
   *
   */
  const handlerSubmit = (evt) => {
    console.log("SetFlightForm - handlerSubmit", formData);
    evt.preventDefault();
    findFlight(formData);
  };
  /*
   *
   */
  const resetField = () => {
    console.log("SetFlightForm - resetField");
    setFormData({
      departureAirport: "",
      arrivalAirport: "",
    });
    closeDisplayInfo();
  };
  /*
   *
   */
  useEffect(() => {
    console.log("SetFlightForm  - useEffect", departureAirport, arrivalAirport);
  }, [departureAirport, arrivalAirport]);
  /*
   *
   */
  return (
    <div className="mainFormContainer">
      <Row>
        <Col xs={2} sm={2} md={3} lg={4} />
        <Col xs={8} sm={8} md={6} lg={4}>
          <Form
            onSubmit={handlerSubmit}
            className="border border-secondary 
            bg-primary rounded  py-5"
          >
            <Row>
              <Col xs={3} md={2} />
              <Col xs={6} md={8}>
                <Form.Control
                  onChange={handlerFormFields}
                  className="text-center"
                  required
                  name="departureAirport"
                  as="select"
                  value={departureAirport}
                >
                  <option value={""}>
                    Select 'Departure airport IATA code
                  </option>
                  {airportData.map((airport) => {
                    return (
                      <option
                        defaultValue={departureAirport}
                        className="text-center"
                        key={airport.id}
                        value={airport.codeIata}
                      >
                        {airport.codeIata}
                      </option>
                    );
                  })}
                </Form.Control>
              </Col>
              <Col xs={3} md={2} />
            </Row>
            <Row style={{ height: "40px" }} />
            <Row>
              <Col xs={3} md={2} />
              <Col xs={6} md={8}>
                <Form.Control
                  onChange={handlerFormFields}
                  className="text-center"
                  required
                  name="arrivalAirport"
                  as="select"
                  value={arrivalAirport}
                >
                  <option value={""}>Select 'Arrival airport IATA code</option>
                  {airportData.map((airport) => {
                    return (
                      <option
                        className="text-center"
                        key={airport.id}
                        value={airport.codeIata}
                      >
                        {airport.codeIata}
                      </option>
                    );
                  })}
                </Form.Control>
              </Col>
              <Col xs={3} md={2} />
            </Row>
            <Row style={{ height: "20px" }} />
            <Row style={{ height: "40px" }} />
            <Row>
              <Col xs={3} md={2} />
              <Col xs={6} md={8}>
                <Button variant="dark" type="input" block>
                  {"Find"}
                </Button>
                <Button
                  onClick={resetField}
                  type="button"
                  variant={"warning"}
                  block
                >
                  {"Reset"}
                </Button>
              </Col>
              <Col xs={3} md={2} />
            </Row>
          </Form>
        </Col>
        <Col xs={2} sm={2} md={6} lg={4} />
      </Row>
    </div>
  );
};
/*
 *
 */
export default SetFlightForm;
