import { useState, useCallback, useEffect } from 'react';
import QrScanner from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ScanAssets = () => {
  const [qrCode, setQrCode] = useState<{ text: string } | null>(null);
  const [redirectUrl, setRedirectUrl] = useState('');
  const navigate = useNavigate();

  const handleScan = useCallback((data: any) => {
    if (data) {
      console.log('Scanned QR Code:', data);
      setQrCode(data);
      setRedirectUrl(data.text);
    }
  }, []);

  useEffect(() => {
    console.log('Redirect URL:', redirectUrl);

    if (redirectUrl && window.location.href !== redirectUrl) {
      Swal.fire({
        title: '<span style="font-size: 18px;">ต้องการไปหน้านับสินทรพย์หรือไม่?</span>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = redirectUrl;
        }
      });
    }
  }, [redirectUrl]);

  const handleError = useCallback((err: any) => {
    console.error(err);
  }, []);

  return (
    <div>
      <h1 className='text-center mb-8'>QR Code Scanner</h1>
      <QrScanner 
        onScan={handleScan} 
        onError={handleError} 
        constraints={{
  
          video: { facingMode: "environment" }
        }}
      />
      {/* <p>Scanned QR Code: {qrCode?.text}</p> */}
    </div>
  );
};

export default ScanAssets;