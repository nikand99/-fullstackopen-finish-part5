const Notification = ({ successMessage, errorMessage }) => {
  if (successMessage === null && errorMessage === null) {
    return null
  }
  if (successMessage !== null) {
    return (
      <div className='message success'>
        {successMessage}
      </div>
    )
  }
  else {
    return (
      <div className='message error'>
        {errorMessage}
      </div>
    )
  }
}

export default Notification
