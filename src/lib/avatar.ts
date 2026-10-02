const SIZE = 320;
const MAX_DATA_URL = 380_000;

export async function resizeAvatar(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Choose an image file.");
  if (file.size > 8_000_000) throw new Error("That image is too large.");

  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process that image.");

  const scale = Math.max(SIZE / bitmap.width, SIZE / bitmap.height);
  const w = bitmap.width * scale;
  const h = bitmap.height * scale;
  ctx.drawImage(bitmap, (SIZE - w) / 2, (SIZE - h) / 2, w, h);
  bitmap.close();

  const dataUrl = canvas.toDataURL("image/jpeg", 0.84);
  if (dataUrl.length > MAX_DATA_URL) throw new Error("Could not compress that image. Try a simpler photo.");
  return dataUrl;
}
