import React, { useState } from "react";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import defaults from "../../utils/defaults";

function InputFile() {
  const uploader = Uploader({ apiKey: "free" });
  const [file, setFile] = useState<File | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    console.log(file);

    setFile(file || null);
  }

  async function handleSubmit() {
    if (!file) {
      console.error("No se seleccionó ningún archivo");
      return;
    }

    const formData = new FormData();
    formData.append("filepath", file);
    formData.append("filename", file.name);

    try {
      const response = await fetch(`${defaults.urlBase}/upload_files`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <UploadButton
        uploader={uploader}
        options={{ multi: true }}
        onComplete={(files) => alert(files.map((x) => x.fileUrl).join("\n"))}
      >
        {({ onClick }) => <button onClick={onClick}>Upload a file...</button>}
      </UploadButton>
    </div>
  );
}

export default InputFile;
