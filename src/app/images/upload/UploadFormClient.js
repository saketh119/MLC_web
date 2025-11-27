"use client";
import { useState } from "react";

export default function UploadFormClient() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus("Please choose a file");
      return;
    }
    setStatus("Uploading...");
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("file", file);
      // Switch to Cloudinary-backed upload
      const res = await fetch("/api/images/cloudinary", { method: "POST", body: fd });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResult(data);
      setStatus("Uploaded successfully");
    } catch (err) {
      console.error(err);
      setStatus("Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Upload Image</h1>
        <form onSubmit={onSubmit} className="space-y-4 bg-neutral-900 p-6 rounded-xl border border-white/10">
          <div>
            <label className="block text-sm mb-1">Title (optional)</label>
            <input
              className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-cyan-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Image title"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">File</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2 rounded-md bg-cyan-600 hover:bg-cyan-700 transition"
          >
            Upload
          </button>
          {status && <p className="text-sm text-gray-300">{status}</p>}
        </form>

        {result && (
          <div className="mt-8 bg-neutral-900 p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-semibold mb-3">Result</h2>
            <p className="text-sm text-gray-300 break-words">servedUrl: {result.servedUrl}</p>
            <p className="text-sm text-gray-300 break-words">public_id: {result.public_id}</p>
            <div className="mt-4">
              <img src={result.servedUrl} alt={result.title || "uploaded"} className="max-w-full rounded-md border border-white/10" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
