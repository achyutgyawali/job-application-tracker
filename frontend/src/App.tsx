import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApplicationList } from './components/ApplicationList';
import { ApplicationForm } from './components/ApplicationForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <h1>Job Application Tracker</h1>
          <p>Track and manage your job applications in one place.</p>
        </header>

        <Routes>
          <Route path="/" element={<ApplicationList />} />
          <Route path="/add" element={<ApplicationForm />} />
          <Route path="/edit/:id" element={<ApplicationForm />} />
        </Routes>
      </div>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;
