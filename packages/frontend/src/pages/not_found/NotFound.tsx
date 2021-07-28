import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="notfound" style={{flexDirection: 'column'}}>
      <div className="notfound-404">
        <h1>404</h1>
      </div>
      <h2>Oops, The Page you are looking for can't be found!</h2>
      <Link to="/" className="button" style={{width: 240}}>Go back Home</Link>
    </div>
  )
}