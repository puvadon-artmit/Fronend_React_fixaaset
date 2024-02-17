import { useState } from 'react';
import QRCode from 'react-qr-code';

export default function GenerateQR() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const fullURL = `http://localhost:5173/assets/${inputValue}`;

  return (
    <div>
      <label htmlFor="inputValue">Enter a number: </label>
      <input
        type="text"
        id="inputValue"
        value={inputValue}
        onChange={handleInputChange}
      />
      
      <div>
        {inputValue && (
          <QRCode value={fullURL} />
        )}
      </div>
    </div>
  );
}
