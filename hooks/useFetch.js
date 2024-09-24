import { useState, useEffect } from "react";
import axios from 'axios'
import { RAPID_API_KEY, RAPID_HOST, RAPID_URL } from '@env'

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const options = {
        method: 'GET',
        url: `${RAPID_URL}/${endpoint}`,
        params: { ...query },
        headers: {
          'X-RapidAPI-Key': RAPID_API_KEY,
          'X-RapidAPI-Host': RAPID_HOST
        }
    };

    const fetchData = async () => {
        setIsLoading(true);
      
        try {
          const response = await axios.request(options);
      
          if (response.status === 200) {
            setData(response.data.data);
            setIsLoading(false);
          } else {
            console.error(`HTTP error! Status: ${response.status}`);
          }
        } catch (error) {
          setError(error)
          alert('There is an error')
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    const reFetch = () => {
        isLoading(true)
        fetchData()
    }

    return { data, error, isLoading, reFetch }
}

export default useFetch