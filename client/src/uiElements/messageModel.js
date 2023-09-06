import { useEffect, useState } from 'react'

import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const MessageModal = props => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
      props.onClear()
    }, 3000000)
    return () => clearTimeout(timer)
  }, [props])

  if (show) {
    return (
      <Container className='alert-container'>
        <Row>
          <Col>
            {props.message.state === 'success' && (
              <Alert
                variant='success'
                onClose={() => setShow(false)}
                dismissible
              >
                {props.message.text}
              </Alert>
            )}
            {props.message.state === 'error' && (
              <Alert
                variant='danger'
                onClose={() => setShow(false)}
                dismissible
              >
                {props.message.text}
              </Alert>
            )}
            {props.message.state === 'warning' && (
              <Alert
                variant='warning'
                onClose={() => setShow(false)}
                dismissible
              >
                {props.message.text}
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    )
  }
}
export default MessageModal
