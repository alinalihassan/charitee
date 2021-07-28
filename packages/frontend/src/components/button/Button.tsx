import './Button.css'

type ButtonProps = {
  text: string,
  link: string
}

const Button = (props: ButtonProps) => ( 
  <a href={props.link} className="button">{props.text}</a>
)

export default Button;