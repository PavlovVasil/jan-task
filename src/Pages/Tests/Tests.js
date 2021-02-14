import React, { useState, useEffect } from 'react';
import { Attribute, LoadingIndicator } from '../../Components';

export const Tests = () => {
  const [attributes, setAttributes] = useState([]);
  const [tests, setTests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial component data
  useEffect(() => {
    (async () => {
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
        setIsLoading(false)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  return (
    <div style={{display: 'flex', height: '100vh'}}>
      {isLoading
        ? <LoadingIndicator />
        : attributes.length > 0 &&
        attributes.map(attribute =>
          <Attribute
            key={attribute.id}
            attributeData={attribute}
            tests={tests} />)
      }
    </div>
  )
}