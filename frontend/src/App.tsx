import { ApplicationList } from './components/ApplicationList';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Mini Job Application Tracker</h1>
      <hr style={{ marginBottom: '20px' }} />

      {/* We will add Router and Navigation here later to toggle between List and Forms */}
      <ApplicationList />
    </div>
  );
}

export default App;
