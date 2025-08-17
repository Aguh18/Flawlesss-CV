import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Login, Home, CvReview, Dashboard, Signup} from '../pages/index';
import ProtectedRoute from '../utils/ProtectedRoute';
import ProtectedLoginRoute from '../utils/protectedLoginRoute';

const Routers = () => {
  return (
    <div>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<ProtectedLoginRoute><Login /></ProtectedLoginRoute> } />
          <Route path="/signup" element={<ProtectedLoginRoute><Signup/></ProtectedLoginRoute>} />
          <Route path="/cv-review" element={ <ProtectedRoute><CvReview /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
             <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          {/* <Route path="/payment" element={<Payment />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/sign-up" element={<SignUp />} /> */}
          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
        
    </div>
  );
};

export default Routers;