import React, { useState } from 'react';

export default function Alert() {
  const [showAlert, setShowAlert] = useState(true);

  const handleDismiss = () => {
    setShowAlert(false);
  };

  return (
    <div>
      {showAlert && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Your product is successfully added</strong>
          <button
            type="button"
            onClick={handleDismiss}
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
    </div>
  );
}
