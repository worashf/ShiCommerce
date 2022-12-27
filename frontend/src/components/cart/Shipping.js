import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {countries} from "countries-list"
import MetaData from '../layout/MetaData'
import { saveShippingInfo } from '../../redux/actions/cartActions'
import { useNavigate } from 'react-router-dom'
const Shipping = () => {
    const { shippingInfo } = useSelector(state => state.cart)
    
    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [postalCode, setPostalCode]= useState(shippingInfo.postalCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [country, setCountry] = useState(shippingInfo.country)


 const countriesList = Object.values(countries)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const saveShippingInfoHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingInfo({ address, country, city, postalCode, phoneNo }))
        navigate("/confirm")
        
    }


  return (
      <div className='container '>
          <MetaData title={"Shipping Info"} />
          <div className="col-10 col-lg-5 mx-auto my-5">
                    <form className="shadow-lg p-5" onSubmit={saveShippingInfoHandler}>
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                          value={address}
                          onChange={e=>setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                          value={city}
                          onChange ={e=> setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                          value={phoneNo}
                          onChange={e=>setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                          value={postalCode}
                          onChange={e=>setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                          value={country}
                          onChange={e=>setCountry(e.target.value)}
                                required
                            >
                                 
                          {
                              countriesList.map(country => (
                                  <option key = {country.name}   value={country.name}>
                              {country.name}
                          </option>)
                          )}
                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn  w-100 btn-block py-3"
                        >
                            CONTINUE
                            </button>
                    </form>
                </div>
      </div>
  )
}

export default Shipping