import React from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { AxiosLib } from '../../lib/axios'
import { useContext } from 'react'
import { AuthContext } from '../../context/user'

export const NewSellPost = () => {
  const auth = useContext(AuthContext)
  const IsLogin = auth?.authContext.IsLogin || false
  if (!IsLogin) {
    window.location.href = '/login'
  }
  const [post, setPet] = useState({
    petType: '',
    petGene: '',
    petAge: '',
    petName: '',
    petGender: '',
    petBD: '',
    petPrice: '',
    petImages: '',
    petDescription: '',
  })
  const handleChange = (e) => {
    setPet({ ...post, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      post.petType === '' ||
      post.petGene === '' ||
      post.petAge === '' ||
      post.petName === '' ||
      post.petGender === '' ||
      post.petBD === '' ||
      post.petPrice === '' ||
      post.petImages === '' ||
      post.petDescription === ''
    ) {
      return Swal.fire('Error', 'Please fill all the information', 'error')
    } //random post id with require 30 character url number and charecter
    else {
      try {
        AxiosLib.post('/api/newsellpost', post)
        if (post.status === 201) {
          Swal.fire('Success', 'Post has been created', 'success')
          window.location.href = '/'
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <>
      {IsLogin ? (
        <form
          onSubmit={handleSubmit}
          onChange={handleChange}
          className="border-solid bg-rose-50 flex justify-center items-center h-52 flex-col"
        >
          <div>
            <label htmlFor="petType">Type</label>
            <input type="text" placeholder="Type" id="petType" name="petType" />
            <label htmlFor="petGene">Gene</label>
            <input type="text" placeholder="Gene" id="petGene" name="petGene" />
            <label htmlFor="petAge">Age</label>
            <input type="number" min="0" placeholder="Age" id="petAge" name="petAge" />
          </div>
          <div>
            <label htmlFor="petName">Pet Name</label>
            <input type="text" placeholder="Pet Name" id="petName" name="petName" />
            <label htmlFor="petGender ">Gender</label>
            <select name="petGender" id="petGender">
              <option disabled selected hidden>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="petBD">Date of Birth</label>
            <input type="date" placeholder="Date of Birth" id="petBD" name="petBD" />
            <label htmlFor="petPrice">Price</label>
            <input className="text-center" type="number" min="0" placeholder="Price" id="petPrice" name="petPrice" />
          </div>
          <div>
            <label htmlFor="petImages">Images</label>
            <input type="file" name="petImages" id="petImages" accept="image/*" />
          </div>
          <div>
            <label htmlFor="petDescription">Description</label>
            <textarea name="petDescription" id="petDescription" placeholder="Description"></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        (window.location.href = '/login')
      )}
    </>
  )
}