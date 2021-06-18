import { Row, Col } from 'react-bootstrap'
import './Footer.css'

export default function Footer() {
  return (
    <Row className="footer">
        <Col>
          <span>© {(new Date().getFullYear())} Charitee</span>

          <a href="https://www.google.com">Terms & Conditions</a>
          <a href="https://www.google.com">Privacy Policy</a>
          <a href="https://www.google.com">Contact</a>
        </Col>
    </Row>
  )
}