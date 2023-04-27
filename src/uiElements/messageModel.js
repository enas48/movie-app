import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const MessageModal = (props) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (show) {
    return (
      <Container className='alert-container'>
        <Row>
          <Col>
            {props.success ?
              <Alert variant="success" onClose={() => setShow(false)} dismissible>
                {props.text}
              </Alert> 
              : <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                {props.text}
              </Alert>
              }
          </Col>
        </Row>
      </Container>


    );
  }
}
export default MessageModal;