import { promises as fs } from 'fs';
import path from 'path';

export default async (req, res) => {
  // POST メソッド以外は拒否
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  const { selectedImages } = await useBody(req);
  if (!selectedImages || !Array.isArray(selectedImages)) {
    return res.status(400).json({ error: 'Invalid input' });
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
  res.status(200).json({ success: true });
};