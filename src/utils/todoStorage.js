import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'text/plain',
];

export function validateTodoFile(file) {
  if (!file) return null;
  if (file.size > MAX_FILE_SIZE) {
    return 'File must be 5 MB or smaller.';
  }
  if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
    return 'Allowed types: images, PDF, or plain text.';
  }
  return null;
}

export async function uploadTodoFile(file, todoId) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `todos/${todoId}/${Date.now()}_${safeName}`;
  const storageRef = ref(storage, storagePath);

  await uploadBytes(storageRef, file);
  const fileUrl = await getDownloadURL(storageRef);

  return {
    fileUrl,
    fileName: file.name,
    storagePath,
  };
}

export async function deleteTodoFile(storagePath) {
  if (!storagePath) return;
  await deleteObject(ref(storage, storagePath));
}
