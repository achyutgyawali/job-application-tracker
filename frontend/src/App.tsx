import { useState } from 'react';
import type { Application } from './types/application';
import { ApplicationList } from './components/ApplicationList';
import { ApplicationForm } from './components/ApplicationForm';

type View = 'list' | 'add' | 'edit';

function App() {
  const [view, setView] = useState<View>('list');
  const [editingApp, setEditingApp] = useState<Application | null>(null);

  const handleAdd = () => {
    setEditingApp(null);
    setView('add');
  };

  const handleEdit = (app: Application) => {
    setEditingApp(app);
    setView('edit');
  };

  const handleSave = () => {
    setEditingApp(null);
    setView('list');
  };

  const handleCancel = () => {
    setEditingApp(null);
    setView('list');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Mini Job Application Tracker</h1>
      <hr style={{ marginBottom: '20px' }} />

      {view === 'list' && (
        <ApplicationList onAdd={handleAdd} onEdit={handleEdit} />
      )}

      {(view === 'add' || view === 'edit') && (
        <ApplicationForm
          editData={editingApp}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default App;
