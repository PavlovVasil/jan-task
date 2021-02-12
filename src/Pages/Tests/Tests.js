import React, { useState, useEffect } from 'react';
import { Test } from '../../Components/Tests'

export const Tests = () => {
    const [attributes, setAttributes] = useState([])
    const [tests, setTests] = useState([])

    // Fetch initial component data
    useEffect(() => {
        (async() => {
            try {
              const urls = [
                'http://localhost:3001/attributes/',
                'http://localhost:3001/tests/'
              ];
              const allRequests = urls.map(url => fetch(url).then(res => res.json()));
              const [
                { attributes },
                { tests }
              ] = await Promise.all(allRequests);

              setAttributes(attributes);
              setTests(tests);
            } catch (e) {
                console.log(e)
            }
        })()
    }, [])
    
    return (
      <>
      {tests.length > 0 &&
        tests.map(test => <Test />)
      }
      </>
    )
}