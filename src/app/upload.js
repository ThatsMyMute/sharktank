import { useState } from 'react';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append('video', file);
    
    const response = await fetch('/api/process', {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    setResult(data);
  };

  return (
    <div>
      <h1>Video Subtitle Generator</h1>
      <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Generate Subtitles</button>
      
      {result && (
        <div>
          <h2>Subtitles</h2>
          <textarea readOnly value={result.subtitles} />
          <a href={result.downloadUrl} download>Download SRT</a>
        </div>
      )}
    </div>
  );
}
