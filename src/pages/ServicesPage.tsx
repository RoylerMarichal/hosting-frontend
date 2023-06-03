import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_SERVICES } from '../utils/queries'

const ServicesPage = () => {

  const {data:dataServices,loading:loadingServices,error:ErrorService} = useQuery(GET_SERVICES);  

  console.log(dataServices);
  

  return (
    <div>
    

    </div>
  )
}

export default ServicesPage