import { promises as fs } from 'fs';
import path from 'path';
import { defineEventHandler, readBody, getMethod } from 'h3';

export default defineEventHandler(async (event) => {
  // POST メソッド以外は拒否
  if (getMethod(event) !== 'POST') {
    event.res.statusCode = 405;
    return { error: 'Method Not Allowed' };
  }

  // リクエストボディを取得
  const { selectedImages } = await readBody(event);
  if (!selectedImages || !Array.isArray(selectedImages)) {
    event.res.statusCode = 400;
    return { error: 'Invalid input' };
  }

  // 元の画像フォルダーと出力先フォルダーのパスを指定
  const sourceFolder = path.join(process.cwd(), 'public', 'images', 'original');
  const outputFolder = path.join(process.cwd(), 'public', 'images', 'favorites');

  // 出力先フォルダーがなければ作成
  await fs.mkdir(outputFolder, { recursive: true });

  // 画像を出力先フォルダーへコピー
  for (const file of selectedImages) {
    await fs.copyFile(
      path.join(sourceFolder, file),
      path.join(outputFolder, file)
    );
  }

  return { success: true };
});