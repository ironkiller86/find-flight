import axios from 'axios'

import { useState, useEffect } from 'react';
import './App.css';
import SetFlightsForm from './Components/SetFlightsForm'
import MySpinner from './Components/MySpinner';
import DisplayInfo from './Components/DisplayInfo';
import config from './config'
/*
 * 
 */
const App = () => {
  const [loading, setLoading] = useState(false)
  const [bestFlight, setBestFlight] = useState({ price: '', airline: '', show: false, variant: null, airportData: [] })

  const { price, airline, show, variant, airportData } = bestFlight

  /**
   * 
   * @param {*} param0 
   */
  const findFlight = async ({ departureAirport, arrivalAirport }) => {
    console.log('App - findFlight', loading);
    setLoading(loading => !loading)
    let httpConfig = {
      method: 'get',
      url: `${config.url}flights/from/${departureAirport}/to/${arrivalAirport}`,
      headers: { Authorization: `Bearer ${config.token}` },
    }
    let bestFlightResp = null
    try {
      bestFlightResp = await axios.request({ ...httpConfig })
    } catch (error) {
      console.log(error)
      setBestFlight({ ...bestFlight, variant: 'danger', show: true })
      setLoading(loading => !loading)
      return
    }

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
      price: bestFlightRaw.price,
      variant: 'success',
      show: true
    }
    setBestFlight({ ...bestFlight, ...definitiveBestFlight })
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
  /*
   * 
   */
  useEffect(() => {
    const getAirport = async () => {
      setLoading(loading => !loading)
      let httpConfig = {
        method: 'get',
        url: `${config.url}airports/all`,
        headers: { Authorization: `Bearer ${config.token}` },
      }
      let httpResp = null
      try {
        httpResp = await axios.request({ ...httpConfig })
        let airportListObj = httpResp?.data?.data
        setBestFlight({ ...bestFlight, airportData: [...airportListObj] })
        setLoading(loading => !loading)
      } catch (error) {
        console.log(error)
        setBestFlight({ ...bestFlight, variant: 'danger', show: true })
        setLoading(loading => !loading)
        return
      }
    }
    const anonimus = async () => {
      await getAirport()
    }
    anonimus()
  }, [])


  return (

    <div style={{ marginTop: '5%', }}>

      <>
        <SetFlightsForm
          airportData={airportData}
          loading={loading}
          findFlight={findFlight} />

        { bestFlight.show ?
          <DisplayInfo
            variant={variant}
            price={price}
            airline={airline}
            errorMsg=' Sorry an Error happed' /> :
          null}
      </>
      {loading ?
        <MySpinner /> : null
      }
    </div>
  );
}
/*
 * 
 */
export default App;
