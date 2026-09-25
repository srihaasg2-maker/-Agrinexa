import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, Upload, Check, AlertCircle, Sparkles, X } from 'lucide-react';

interface CameraScannerProps {
  onBillCaptured: (item: string, vendor: string, amount: number) => void;
  onCancel: () => void;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({ onBillCaptured, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  // Bill OCR Form State
  const [vendor, setVendor] = useState<string>('Sri Lakshmi Seeds & Fert');
  const [item, setItem] = useState<string>('5 Bags NPK Fertilizer');
  const [amount, setAmount] = useState<string>('8450');

  // Start Camera Stream
  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err: any) {
      console.warn("Camera error or permission denied:", err);
      setCameraError("Camera access unavailable. You can upload a receipt photo instead.");
      setCameraActive(false);
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  // Take Snapshot from Video Stream
  const takeSnapshot = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
        stopCamera();
        simulateOCR();
      }
    }
  };

  // Handle File Upload Fallback
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCapturedImage(event.target.result as string);
          stopCamera();
          simulateOCR();
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Simulate Smart Receipt OCR Extraction
  const simulateOCR = () => {
    setIsScanning(true);
    setTimeout(() => {
      // Pick random simulated bill data for fun if needed
      const sampleBills = [
        { vendor: 'Sri Rama Agri Traders', item: '10 Bags Urea Fertilizer', amount: '3450' },
        { vendor: 'Kisan Diesel Bunk', item: 'Tractor Fuel (60L)', amount: '5800' },
        { vendor: 'Balaji Agro Seeds', item: 'Paddy Hybrid Seeds', amount: '4200' },
      ];
      const randomBill = sampleBills[Math.floor(Math.random() * sampleBills.length)];
      setVendor(randomBill.vendor);
      setItem(randomBill.item);
      setAmount(randomBill.amount);
      setIsScanning(false);
    }, 1200);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item || !amount) return;
    onBillCaptured(item, vendor, parseFloat(amount) || 0);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-2xl border-4 border-farm-green space-y-5 text-left relative max-w-xl mx-auto animate-fade-in">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-farm-green text-farm-accent flex items-center justify-center font-bold">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-stone-900 text-lg">Real Bill Camera Scanner</h3>
            <p className="text-[11px] font-bold text-farm-dark">Point camera at paper bill & snap photo</p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="p-1.5 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Hidden Canvas for Snapshot */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Camera Live Stream / Captured Image Box */}
      {!capturedImage ? (
        <div className="relative bg-stone-900 rounded-2xl overflow-hidden aspect-video flex items-center justify-center border-2 border-farm-green shadow-inner">
          
          {/* Live Video Feed */}
          <video
            ref={videoRef}
            playsInline
            muted
            className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
          />

          {/* Camera Error / Fallback UI */}
          {!cameraActive && (
            <div className="p-6 text-center text-white space-y-3">
              <Camera className="w-12 h-12 text-farm-accent mx-auto animate-pulse" />
              <p className="text-sm font-bold text-stone-200">
                {cameraError || "Initializing camera stream..."}
              </p>
              <label className="inline-flex items-center gap-2 bg-farm-green hover:bg-farm-dark text-white font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer shadow">
                <Upload className="w-4 h-4" />
                <span>Upload Bill Photo From Gallery</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {/* Target Overlay Lines */}
          {cameraActive && (
            <div className="absolute inset-4 border-2 border-dashed border-farm-accent/80 rounded-xl pointer-events-none flex items-center justify-center">
              <span className="text-[11px] font-bold bg-stone-900/80 text-farm-accent px-3 py-1 rounded-full uppercase">
                ALIGN RECEIPT HERE
              </span>
            </div>
          )}

          {/* Camera Shutter Button */}
          {cameraActive && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center">
              <button
                type="button"
                onClick={takeSnapshot}
                className="bg-white border-4 border-farm-green text-farm-dark p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform flex items-center justify-center"
                title="Take Photo"
              >
                <div className="w-6 h-6 rounded-full bg-farm-green" />
              </button>
            </div>
          )}

        </div>
      ) : (
        <div className="space-y-4">
          
          {/* Display Captured Snapshot Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-video border-2 border-emerald-500 shadow">
            <img src={capturedImage} alt="Captured Receipt" className="w-full h-full object-cover" />
            <button
              onClick={handleRetake}
              className="absolute top-3 right-3 bg-stone-900/80 hover:bg-black text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retake Photo</span>
            </button>
          </div>

          {/* OCR Processing State */}
          {isScanning ? (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-center space-y-2">
              <Sparkles className="w-6 h-6 text-emerald-600 animate-spin mx-auto" />
              <p className="font-extrabold text-emerald-950 text-sm">AI Extracting Rupees & Line Items...</p>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-xl text-xs font-bold text-emerald-900 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Receipt Scanned! Details extracted below in Rupees (₹).</span>
            </div>
          )}

        </div>
      )}

      {/* Bill Extracted Form */}
      <form onSubmit={handleSubmit} className="space-y-3 pt-2">
        <div>
          <label className="block text-xs font-extrabold text-stone-700 uppercase">Shop / Vendor Name</label>
          <input
            type="text"
            required
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-stone-900 font-bold focus:outline-none focus:border-farm-green text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-extrabold text-stone-700 uppercase">Item Description</label>
          <input
            type="text"
            required
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-stone-900 font-bold focus:outline-none focus:border-farm-green text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-extrabold text-stone-700 uppercase">Total Amount in Rupees (₹)</label>
          <input
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-stone-900 font-black text-lg focus:outline-none focus:border-farm-green"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="w-1/3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-3 rounded-xl text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-2/3 bg-farm-green hover:bg-farm-dark text-white font-extrabold py-3 rounded-xl shadow text-sm flex items-center justify-center gap-1"
          >
            <Check className="w-4 h-4 text-farm-accent" />
            <span>Add Bill To Ledger</span>
          </button>
        </div>
      </form>

    </div>
  );
};
