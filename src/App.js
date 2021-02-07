/*
 *
 */
import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import SetFlightsForm from "./Components/SetFlightsForm";
import MySpinner from "./Components/MySpinner";
import DisplayInfo from "./Components/DisplayInfo";
import config from "./config";
/*
 *
 */
const App = () => {
  const [loading, setLoading] = useState(false);
  const [appData, setAppData] = useState({
    price: "",
    airline: "",
    show: false,
    variant: null,
    airportData: [],
  });
  const { price, airline, show, variant, airportData } = appData;
  /*
   *
   */
  const closeDisplayInfo = () => {
    setAppData({ ...appData, show: false });
  };
  /**
   * trova i dati relativi al volo piu economico
   * @param {*} departureAirport
   * @param {*} arrivalAirport
   */
  const getBestFlightData = async (departureAirport, arrivalAirport) => {
    let httpConfig = {
      method: "get",
      url: `${config.url}flights/from/${departureAirport}/to/${arrivalAirport}`,
      headers: { Authorization: `Bearer ${config.token}` },
    };
    let flightsData = null;
    try {
      flightsData = await axios.request({ ...httpConfig });
    } catch (error) {

      setAppData({ ...appData, variant: "danger", show: true });
      setLoading((loading) => !loading);
      return;
    }
    console.log("App - findFlight", flightsData);
    const flightsList = flightsData?.data?.data;
    let bestFlight = null;
    if (flightsList.length > 1) {
      bestFlight = flightsList.reduce((prev, curr) =>
        prev.price < curr.price ? prev : curr
      );
    } else {
      bestFlight = flightsList[0];
    }
    return bestFlight;
  };
  /**
   *   trova il nome delle compagnia aerea che effettua il
   *   volo piu economico
   * @param {*} bestFlight
   */
  const getAirline = async (bestFlight) => {
    let httpConfig = {
      method: "get",
      url: `${config.url}airlines/all`,
      headers: { Authorization: `Bearer ${config.token}` },
    };
    let airlinesListResponse = null;
    try {
      airlinesListResponse = await axios.request({ ...httpConfig });
    } catch (error) {
      setAppData({ ...appData, variant: "danger", show: true });
      return;
    }
    const airlinesList = airlinesListResponse?.data?.data;
    const airlineObj = airlinesList.find(
      (airline) => airline.id === bestFlight.airlineId
    );
    console.log("airlineObj", airlineObj);
    return airlineObj;
  };
  /*
   * trova il volo piu economico
   */
  const findFlight = async ({ departureAirport, arrivalAirport }) => {
    console.log("App - findFlight", loading);
    if (show) {
      setAppData({ ...appData, show: false });
    }
    setLoading((loading) => !loading);
    const bestFlight = await getBestFlightData(
      departureAirport,
      arrivalAirport
    );
    const airline = await getAirline(bestFlight);
    if (airline) {
      let finalData = {
        airline: airline.name,
        price: bestFlight.price,
        variant: "dark",
        show: true,
      };
      setAppData({ ...appData, ...finalData });
    }
    setLoading((loading) => !loading);
  };
  /*
   *
   */
  useEffect(() => {
    console.log("App - useEffect", loading);
  }, [loading]);
  /*
   *
   */
  useEffect(() => {
    console.log("App - useEffect miglior volo", appData);
  }, [appData]);
  /*
   * fetch IATA Airport
   */
  useEffect(() => {
    const getAirport = async () => {
      setLoading((loading) => !loading);
      let httpConfig = {
        method: "get",
        url: `${config.url}airports/all`,
        headers: { Authorization: `Bearer ${config.token}` },
      };
      let httpResp = null;
      try {
        httpResp = await axios.request({ ...httpConfig });
        let airportListObj = httpResp?.data?.data;
        setAppData({ ...appData, airportData: [...airportListObj] });
        setLoading((loading) => !loading);
      } catch (error) {
        setAppData({ ...appData, variant: "danger", show: true });
        setLoading((loading) => !loading);
        return;
      }
    };
    const wrapper = async () => {
      await getAirport();
    };
    wrapper();
  }, []);
  /**
   *
   */
  return (
    <div className="App">
      <SetFlightsForm
        airportData={airportData}
        loading={loading}
        findFlight={findFlight}
        closeDisplayInfo={closeDisplayInfo}
      />
      {show ? (
        <DisplayInfo
          variant={variant}
          price={price}
          airline={airline}
          errorMsg="Sorry, something went wrong..."
        />
      ) : null}

      {loading ? <MySpinner /> : null}
    </div>
  );
};
/*
 *
 */
export default App;
