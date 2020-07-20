import {Toast} from 'react-bootstrap';
import {InfoSquareFill} from 'react-bootstrap-icons';
import {useDispatch} from 'react-redux';


const Alert = (props) => {
  const dispatch = useDispatch();
setTimeout(()=> {
    dispatch({
      type : "CLEAR_ALERT"
    })
}, 1000)
return <div
    style={{
      position: 'absolute',
      top: 20,
      right: 20,
      zIndex : 99
    }}
  >
    <Toast autohide={true} delay={1000}>
      <Toast.Header>
        <InfoSquareFill/>
        <strong className="mr-auto ml-2">Response</strong>
      </Toast.Header>
          <Toast.Body>{props.message}</Toast.Body>
    </Toast>
  </div>
}

export default Alert;