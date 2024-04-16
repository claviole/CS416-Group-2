import React from 'react';

interface EditOptionsProps {
  onClose: () => void;
  onAddBuilding: () => void; // New prop for adding buildings
}

const EditOptions: React.FC<EditOptionsProps> = ({ onClose, onAddBuilding }) => {
  return (
    <div style={{
      position: 'absolute',
      top: '50px',
      right: '10px',
      zIndex: 3,
      backgroundColor: 'white',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <button onClick={onAddBuilding}>Add Building</button>
      <button onClick={() => { console.log('Edit option 2'); }}>Edit Option 2</button>
      <button onClick={() => { console.log('Edit option 3'); }}>Edit Option 3</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EditOptions;