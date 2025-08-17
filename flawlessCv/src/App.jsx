import Routers from  './routers/Routers'
import {Nav} from './layout'
import { BrowserRouter,  } from 'react-router-dom';
function App() {

  return (
    <BrowserRouter className='h-full min-h-screen bg-black ' style={{textAlign:'center', width:''}}>
      <Nav />
      <Routers />
    </BrowserRouter>
  )
}

export default App