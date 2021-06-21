import logo from '../../assets/img/logo.png'
import './Header.css'

import { Row, Col } from 'react-grid-system'

export default function Header() {
  return (
    <Row className='header'>
      <Col>
        <img src={logo} className="logo" alt="Logo Charitee" />
      </Col>
    </Row>
  )
}