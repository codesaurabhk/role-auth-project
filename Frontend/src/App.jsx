import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import PermissionForm from './components/PermissionForm';
import ProtectedRoute from './components/ProtectedRoute';
import './app.css';

function App() {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/permissions"
        element={
          <ProtectedRoute requiredRole="admin">
            <PermissionForm />
          </ProtectedRoute>
        }
      />
 
      <Route path="*" element={<p>404 - Page Not Found</p>} />
    </Routes>

    {/* <h1 className='text-red-500'>gtdh</h1> */}
    </>

  );
}

export default App;
