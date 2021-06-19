import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './components/header/Header';
import Section from './components/section/Section';
import Footer from './components/footer/Footer';

import mockup_welcome from './assets/img/homepage/mockup-welcome.png'
import mockup_home from './assets/img/homepage/mockup-home.png'
import mockup_donate from './assets/img/homepage/mockup-donate.png'

import { Container, Row } from 'react-bootstrap'

export default function App() {
  return (
    <Container className="App" fluid>
      <Header />
      <Section
        title="Donating made easy"
        description="You can find the best charities locally and globally, and donate seamlessly with us."
        image={mockup_welcome}
        showButton={true}
        buttonText="Donate Now"
        first={true}
      />
      <Section
        title="Trust in Charitee"
        description="It's ok to be skeptical. As a matter of fact, we are skeptical all the time. It's your money and it should be put to good use. Charities have to go through a financial audit and additional verification to be part of our network."
        image={mockup_home}
        reversed={true}
      />
      <Section
        title="Make a change"
        description="Find the right cause to fight for, be it climate change, COVID-19 or education around the world and in your city. It doesn't matter which one you choose as long as it matters to you!"
        image={mockup_donate}
      />
      <Footer />
    </Container>
  );
}
