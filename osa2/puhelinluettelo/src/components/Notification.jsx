const Notification = ({ message, errorMessage }) => {
    const notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
      }

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
      }

    if (message === null || message === '') {
      return null
    }
  
    return (
      <div style={errorMessage ? errorStyle : notificationStyle}>
        {message}
      </div>
    )
  }

export default Notification