const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];

function validateImageFile(file: File): void {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`Image too large. Max: ${MAX_FILE_SIZE / 1024 / 1024}MB`);
  }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(`Invalid file type: ${file.type}`);
  }
}

export async function uploadTokenImage(file: File): Promise<string> {
  validateImageFile(file);

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload/image', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Image upload failed');
  }

  const data = await response.json();
  return data.url;
}

export async function uploadMetadata(
  name: string,
  symbol: string,
  description: string,
  imageUrl: string,
  _attributes?: any,
  externalUrl?: string,
  socialLinks?: Record<string, string>
): Promise<string> {
  const response = await fetch('/api/upload/metadata', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, symbol, description, imageUrl, externalUrl, socialLinks }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Metadata upload failed');
  }

  const data = await response.json();
  return data.url;
}
