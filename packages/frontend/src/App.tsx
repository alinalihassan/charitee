import { ScreenClassProvider } from "react-grid-system";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './pages/home/Home'
import NotFound from "./pages/not_found/NotFound";
import PrivacyPolicy from "./pages/privacy_policy/PrivacyPolicy";
import TermsOfService from "./pages/terms_of_service/TermsOfService";

export default function App() {
  return (
    <ScreenClassProvider>
      <Router>
        <Switch>
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route path="/tos" component={TermsOfService} />
          <Route exact path="/" component={Home} />
          <Route path='*' exact={true} component={NotFound} />
        </Switch>
      </Router>
    </ScreenClassProvider>
  );
}