import './Section.css'
import Button from '../button/Button'
import { Row, Col } from 'react-bootstrap'


type SectionProps = {
  title: string,
  description: string,
  image: string,
  showButton?: boolean,
  buttonText?: string,
  reversed?: boolean
} & typeof defaultProps

const defaultProps = {
  showButton: false,
  buttonText: "",
  reversed: false
}

const Section = (props: SectionProps) => ( 
  <Row className={`section wrapper justify-content-md-center ${props.reversed ? "reversed" : ""}`}>
    <Col xs={{order: props.reversed ? 1 : 0}} lg="5" className="description">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      {props.showButton && 
        <Button text={props.buttonText} link={"TODO"} />
      }
    </Col>
    <Col xs={{order: props.reversed ? 0 : 1}} lg="5">
      <img src={props.image} className='phone' alt="Charitee Screenshot"/>
    </Col>
  </Row>
)

Section.defaultProps = defaultProps
export default Section;