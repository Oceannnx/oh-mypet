import React from 'react'
import Swal from 'sweetalert2'
import { AxiosLib } from '../../lib/axios'

export const ChangePassword = () => {
  const [password, setPassword] = React.useState([])
  const handleChangePassword = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value })
  }
  const handleSubmitPassword = async () => {
    const result = await AxiosLib.post(`/api/changePassword`, password)
    if (result.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Edit Account Success',
        showConfirmButton: false,
        timer: 1500,
      })
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    }
  }

  return (
    <>
      <form>
        <div>Change Password</div>
        <form onSubmit={handleSubmitPassword}>
          <label htmlFor="CurrentPassword">Current Password</label>
          <input
            type="password"
            onChange={handleChangePassword}
            placeholder="Current password"
            name="CurrentPassword"
            id="CurrentPassword"
          />
        </form>
        <div>
          <label htmlFor="NewPassword">New Password</label>
          <input type="password" onChange={handleChangePassword} placeholder="New password" name="confirmPassword" />
        </div>
        <div>
          <label htmlFor="ConfirmPassword">Confirm Password</label>
          <input type="password" onChange={handleChangePassword} placeholder="Confirm password" name="newPassword" />
        </div>
        <input type="submit" value="Change Password" />
      </form>
    </>
  )
}