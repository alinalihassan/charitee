import { Row, Col } from 'react-grid-system'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <Row className="footer">
        <Col>
          <span>© {(new Date().getFullYear())} Charitee</span>

          <Link to="/tos">Terms & Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <a href="mailto:alin@charit.ee">Contact</a>
        </Col>
    </Row>
  )
}