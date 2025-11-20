import { useEffect, useState } from "react";
import JSZip from "jszip";
import "./App.css";

export default function App() {
  const [generatedUrl, setGeneratedUrl] = useState("");

  // API 모드 감지 및 다운로드
  useEffect(() => {
    const hash = location.hash;
    if (hash.startsWith("#data=")) {
      const base64 = decodeURIComponent(hash.substring(6));
      const binary = atob(base64);
      const bytes = new Uint8Array([...binary].map(c => c.charCodeAt(0)));

      (async () => {
        const zip = await JSZip.loadAsync(bytes);
        // 여기서 리팩 처리 가능
        const newZipBlob = await zip.generateAsync({ type: "blob" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(newZipBlob);
        a.download = "repacked.zip";
        a.click();
      })();
    }
  }, []);

  const handleUpload = async (file: File) => {
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1]);
      };
      reader.readAsDataURL(file);
    });
    const url = `${location.origin}${location.pathname}#data=${encodeURIComponent(base64)}`;
    setGeneratedUrl(url);
  };

  return (
    <>
    <div className="container">
      <h1 className="title">Pack Director</h1>

      <div>
        <label className="label">Upload ZIP</label>
        <input
          type="file"
          accept=".zip"
          className="fileInput"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleUpload(e.target.files[0]);
            }
          }}
        />
      </div>

      {generatedUrl && (
        <div>
          <label className="label">Generated URL</label>
          <textarea className="urlBox" readOnly value={generatedUrl} />
        </div>
      )}
    </div>

    <footer>
      <div className="social-icons">
        <a href="https://github.com/grassproject" target="_blank" aria-label="GitHub">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path
          d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.583 0-.288-.01-1.05-.015-2.06-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.932 0-1.31.465-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.323 3.3 1.23a11.5 11.5 0 013.003-.403c1.018.005 2.043.138 3.003.403 2.29-1.554 3.296-1.23 3.296-1.23.653 1.652.242 2.873.118 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.803 5.625-5.475 5.922.43.372.813 1.102.813 2.222 0 1.606-.015 2.9-.015 3.292 0 .323.218.698.825.58C20.565 21.796 24 17.296 24 12c0-6.63-5.373-12-12-12z"/>
          </svg>
          </a>
          <a href="https://discord.com/invite/3n3EHtyQf7" target="_blank" aria-label="Discord">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-discord"
                 viewBox="0 0 16 16">
              <path
                d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
            </svg>
          </a>
        </div>
        <div className='copyrights'>
            <b>2025 &copy; GrassProject. ALL RIGHT RESERVED</b>
        </div>
      </footer>
    </>
  );
}
