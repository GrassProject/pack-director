import { useEffect, useState } from "react";
import JSZip from "jszip";
import "./App.css";

export default function App() {
  const [generatedUrl, setGeneratedUrl] = useState("");

  useEffect(() => {
    const hash = location.hash;
    if (!hash.startsWith("#data=")) return;

    const base64 = decodeURIComponent(hash.substring(6));
    const binary = atob(base64);
    const bytes = new Uint8Array([...binary].map(c => c.charCodeAt(0)));

    (async () => {
      const zip = await JSZip.loadAsync(bytes);

      // 여기서 리팩 작업 넣으면 됨
      // ex) pack.mcmeta 수정, 파일 추가/삭제 등등

      const newZipBlob = await zip.generateAsync({ type: "blob" });

      const a = document.createElement("a");
      a.href = URL.createObjectURL(newZipBlob);
      a.download = "repacked.zip";
      a.click();
    })();
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
    <div className="container">
      <h1 className="title">Resource Pack Director</h1>

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
  );
}
