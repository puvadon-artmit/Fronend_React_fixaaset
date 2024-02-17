import React, { useState, useRef, useEffect } from 'react';
import Container from '@mui/material/Container';


interface SacnProps { }
const Sacn: React.FC<SacnProps> = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleToggleCamera = async () => {
    try {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        setStream(null);
        setVideoReady(false);
      } else {
        const cameraStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
          },
        });
        setStream(cameraStream);
      }
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  };

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().then(() => setVideoReady(true));
    }
  }, [stream]);

  return (
    <div className='flex justify-center mt-40 flex-col items-center'>
      {stream && (
        <Container maxWidth="sm" style={{ minHeight: '100%' }}>
          <div className="flex flex-col items-center mt-2" style={{ position: 'relative', width: '100%', height: '100%' }}>
            <video
              ref={videoRef}
              width="100%"
              height="100%"
              autoPlay
              playsInline
              style={{ transform: 'scaleX(-1)', borderRadius: '20px', height: '100%' }}
            ></video>
            {/* Bounding box for QR code */}
            <div
              style={{
                position: 'absolute',
                top: '20%', 
                left: '20%', 
                width: '60%', 
                height: '60%', 
                border: '2px solid blue',
                borderRadius: '10px', 
                pointerEvents: 'none',
              }}
            ></div>
          </div>
        </Container>
      )}
  
      <button
        type="button"
        className={`text-white ${stream ? 'bg-red-700 mt-6 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800' : 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'} focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2`}
        onClick={handleToggleCamera}
      >
        {stream ? 'ออก' : 'เปิดกล้อง'}
      </button>
    </div>
  );
};

export default Sacn;
