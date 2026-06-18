import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApplicationList } from './components/ApplicationList';
import { ApplicationForm } from './components/ApplicationForm';

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
    </BrowserRouter>
  );
}

export default App;
