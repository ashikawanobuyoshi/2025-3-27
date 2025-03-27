import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { defineEventHandler, setResponseStatus } from 'h3';

export default defineEventHandler(async (event) => {
  const imageFolder = path.join(process.cwd(), 'public', 'images', 'original');
  const thumbFolder = path.join(process.cwd(), 'public', 'images', 'thumbnails');

  // サムネイル用フォルダーが存在しなければ作成
  await fs.mkdir(thumbFolder, { recursive: true });

  // 対象の画像ファイルを取得（拡張子 jpg, jpeg, png, gif など）
  const files = await fs.readdir(imageFolder);
  const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

  // サムネイルが存在しない場合は自動生成（幅200pxにリサイズ）
  for (const file of imageFiles) {
    const thumbPath = path.join(thumbFolder, file);
    try {
      await fs.access(thumbPath);
    } catch (err) {
      await sharp(path.join(imageFolder, file))
        .resize(200)
        .toFile(thumbPath);
    }
  }

  // 必要ならステータスコードを変更することも可能
  setResponseStatus(event, 200);
  return imageFiles;
});