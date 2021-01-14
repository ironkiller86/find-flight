import axios from 'axios'

import { useState, useEffect } from 'react';
import './App.css';
import SetFlightsForm from './Components/SetFlightsForm'
import MySpinner from './Components/MySpinner';
import config from './config'
/*
 * 
 */
const App = () => {
  const [loading, setLoading] = useState(false)
  const [bestFlight, setBestFlight] = useState({})


  const findFlight = async ({ departureAirport, arrivalAirport }) => {
    console.log('App - findFlight', loading);
    setLoading(loading => !loading)
    let httpConfig = {
      method: 'get',
      url: `${config.url}flights/from/${departureAirport}/to/${arrivalAirport}`,
      headers: { Authorization: `Bearer ${config.token}` },
    }
    const bestFlightResp = await axios.request({ ...httpConfig })
    console.log('App - findFlight', bestFlightResp);
    const statusCode = bestFlightResp.status;
    const bestFlightList = bestFlightResp?.data?.data;
    console.log(bestFlightList)
    let bestFlightRaw = []
    if (bestFlightList.length > 1) {
      bestFlightRaw = bestFlightList.reduce((prev, curr) => prev.price < curr.price ? prev : curr)
    }
    else {
      bestFlightRaw = bestFlightList[0]
    }
    console.log(bestFlightRaw)
    httpConfig = {
      method: 'get',
      url: `${config.url}airlines/all`,
      headers: { Authorization: `Bearer ${config.token}` },
    }
    const airlinesListResponse = await axios.request({ ...httpConfig })
    console.log(airlinesListResponse)
    const airlinesList = airlinesListResponse?.data?.data
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>', airlinesList)
    const airlineObj = airlinesList.find(airline => airline.id === bestFlightRaw.airlineId)
    console.log('airlineObj', airlineObj)
    let definitiveBestFlight = {
      airline: airlineObj.name,
      price: bestFlightRaw.price
    }
    setBestFlight({ ...definitiveBestFlight })
    setLoading(loading => !loading)

  }
  /*
   * 
   */
  useEffect(() => {
    console.log('App - useEffect', loading);
  }, [loading])
  /*
   * 
   */
  useEffect(() => {
    console.log('App - useEffect miglio volo', bestFlight);
  }, [bestFlight])


  return (
    <div style={{ marginTop: '5%', }}>

      {loading ?
        <MySpinner /> :
        <SetFlightsForm findFlight={findFlight} /*enableSpinner={setLoading}*/ />
      }
    </div>
  );
}
/*
 * 
 */
export default App;
