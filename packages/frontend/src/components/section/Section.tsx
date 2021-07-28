import './Section.css'
import Button from '../button/Button'
import { Row, Col } from 'react-grid-system'
import MobileStoreButton from '../MobileStoreButton/MobileStoreButton'


type SectionProps = {
  title: string,
  description: string,
  image: string,
  showButton?: boolean,
  buttonText?: string,
  showStoreButton?: boolean,
  reversed?: boolean,
  first?: boolean
} & typeof defaultProps

const defaultProps = {
  showButton: false,
  buttonText: "",
  showStoreButton: false,
  reversed: false,
  first: false
}

const Section = (props: SectionProps) => (
  <Row justify="center" direction={props.reversed ? "row-reverse" : "row"} className={`section wrapper ${props.reversed ? "reversed" : ""} ${props.first ? "first" : ""}`}>
    <Col xs={5} className="description">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      {props.showButton && 
        <Button text={props.buttonText} link={"https://www.example.com"} />
      }
      {props.showStoreButton &&
      <div style={{display: 'flex'}}>
        <MobileStoreButton store='ios' url='https://www.example.com'/>
        <MobileStoreButton store='android' url='https://www.example.com'/>
      </div>
      }
    </Col>
    <Col xs={5}>
      <img src={props.image} className='phone' alt="Charitee Screenshot"/>
    </Col>
  </Row>
)

Section.defaultProps = defaultProps
export default Section;