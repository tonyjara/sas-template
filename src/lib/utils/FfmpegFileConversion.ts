import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";

export const convertFileIfNotMp3 = async ({
  file,
  setIsConverting,
  setProgress,
}: {
  file: File;
  setIsConverting: (isConverting: boolean) => void;
  setProgress: (progress: number) => void;
}) => {
  if (file.type === "audio/mpeg") return file;
  setIsConverting(true);
  const ffmpeg = new FFmpeg();

  const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd";
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
  });

  ffmpeg.on("progress", ({ progress }) => {
    setProgress(progress * 100);
  });

  await ffmpeg.writeFile("input.mp4", await fetchFile(file));
  await ffmpeg.exec(["-i", "input.mp4", "-vn", "output.mp3"]);
  const data = await ffmpeg.readFile("output.mp3");
  const blob = new Blob([data], { type: "audio/mpeg" }); // Set the correct MIME type
  const blobFile = new File([blob], file.name, { type: "audio/mpeg" });

  setIsConverting(false);
  setProgress(0);

  return blobFile;
};
