import {Switch, Route, Redirect} from 'react-router-dom'

import LoginPage from './Components/LoginPage/LoginPage'
import Home from './Components/Home/Home'
import Jobs from './Components/Jobs/Jobs'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import JobItemDetails from './Components/JobItemDetails/JobItemDetails'
import NotFound from './Components/NotFound/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path='/login' component={LoginPage} />
    <ProtectedRoute exact path='/' component={Home} />
    <ProtectedRoute exact path='/jobs' component={Jobs} />
    <ProtectedRoute exact path='/jobs/:id' component={JobItemDetails} />
    <Route path='/not-found' component={NotFound} />
    <Redirect to='not-found' />
  </Switch>
)

export default App
