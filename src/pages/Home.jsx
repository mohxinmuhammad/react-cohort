import { useState, useEffect } from 'react';
import './Home.css';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// import {
//   uploadTodoFile,
//   deleteTodoFile,
//   validateTodoFile,
// } from '../utils/todoStorage';

const EMPTY_FORM = {
  task: '',
  description: '',
  status: 'pending',
  dueDate: '',
};

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

function Home() {
  const [todos, setTodos] = useState([]);

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [firebaseError, setFirebaseError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [existingAttachment, setExistingAttachment] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);


  async function uploadTodoFile(file, todoId) {
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
  
  async function deleteTodoFile(storagePath) {
    if (!storagePath) return;
    await deleteObject(ref(storage, storagePath));
  }
  
  useEffect(() => {
    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
    };
  }, [filePreview]);

  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const nextTodos = snapshot.docs.map((d) => ({
          ...d.data(),
          id: d.id,
        }));
        setTodos(nextTodos);
      },
      (error) => {
        console.error('Failed to load todos:', error);
      }
    );
    return unsubscribe;
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.task.trim()) {
      newErrors.task = 'Task is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const clearFileSelection = () => {
    if (filePreview) URL.revokeObjectURL(filePreview);
    setSelectedFile(null);
    setFilePreview(null);
    if (errors.file) {
      setErrors(prev => ({ ...prev, file: '' }));
    }
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setEditingId(null);
    setErrors({});
    setFirebaseError('');
    setExistingAttachment(null);
    clearFileSelection();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    // e.target.value = '';
    if (!file) return;
    setSelectedFile(file);

    // const fileError = validateTodoFile(file);
    // if (fileError) {
    //   setErrors(prev => ({ ...prev, file: fileError }));
    //   return;
    // }

    // clearFileSelection();
    // setErrors(prev => ({ ...prev, file: '' }));

    // if (file.type.startsWith('image/')) {
    //   setFilePreview(URL.createObjectURL(file));
    // }
  };

  const getAttachmentFields = () => {
    if (selectedFile) return null;
    if (existingAttachment) {
      return {
        fileUrl: existingAttachment.fileUrl,
        fileName: existingAttachment.fileName,
        storagePath: existingAttachment.storagePath,
      };
    }
    return {
      fileUrl: null,
      fileName: null,
      storagePath: null,
    };
  };

  const uploadFileForTodo = async (file, todoId) => {
    setUploadingFile(true);
    try {
      return await uploadTodoFile(file, todoId);
    } finally {
      setUploadingFile(false);
    }
  };

  const todoPayload = () => ({
    task: formData.task.trim(),
    description: formData.description.trim(),
    status: formData.status,
    dueDate: formData.dueDate,
  });

  const updateTodoInFirebase = async (id, attachment) => {
    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, {
      ...todoPayload(),
      ...attachment,
      updatedAt: new Date().toLocaleString(),
    });
  };

  const deleteTodoFromFirebase = async (id, storagePath) => {
    await deleteTodoFile(storagePath);
    await deleteDoc(doc(db, 'todos', id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);
    setFirebaseError('');

    try {
      if (editingId) {
        let attachment = getAttachmentFields();

        if (selectedFile) {
          if (existingAttachment?.storagePath) {
            await deleteTodoFile(existingAttachment.storagePath);
          }
          attachment = await uploadFileForTodo(selectedFile, editingId);
        }

        await updateTodoInFirebase(editingId, attachment);
      } else {
        const docRef = await addDoc(collection(db, 'todos'), {
          ...todoPayload(),
          fileUrl: null,
          fileName: null,
          storagePath: null,
          createdAt: new Date().toLocaleString(),
        });

        if (selectedFile) {
          // const attachment = await uploadTodoFile(selectedFile, docRef.id);
          // const attachment = await uploadFileForTodo(selectedFile, docRef.id);
          // const safeName = selectedFile.name.replace(/[^a-zA-Z0-9._-]/g, '_');
          const storagePath = `todos/${selectedFile.name}`;
          const storageRef = ref(storage, storagePath);
        
          await uploadBytes(storageRef, selectedFile);
          const fileUrl = await getDownloadURL(storageRef);
        
          const attachment = {
            fileUrl,
            fileName: selectedFile.name,
            storagePath,
          };

          await updateDoc(doc(db, 'todos', docRef.id), attachment);
        }
      }
      resetForm();
    } catch (error) {
      console.error('Failed to save todo:', error);
      setFirebaseError(
        editingId ? 'Could not update todo. Try again.' : 'Could not add todo. Try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (todo) => {
    setFirebaseError('');
    setFormData({
      task: todo.task ?? '',
      description: todo.description ?? '',
      status: todo.status ?? 'pending',
      dueDate: todo.dueDate ?? '',
    });
    setEditingId(todo.id);
    clearFileSelection();
    if (todo.fileUrl) {
      setExistingAttachment({
        fileUrl: todo.fileUrl,
        fileName: todo.fileName,
        storagePath: todo.storagePath,
      });
    } else {
      setExistingAttachment(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this todo?')) return;

    setDeletingId(id);
    setFirebaseError('');

    try {
      const todo = todos.find(t => t.id === id);
      await deleteTodoFromFirebase(id, todo?.storagePath);
      if (editingId === id) resetForm();
    } catch (error) {
      console.error('Failed to delete todo:', error);
      setFirebaseError('Could not delete todo. Try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredTodos = todos.filter(todo => {
    const term = searchTerm.toLowerCase();
    return (
      (todo.task ?? '').toLowerCase().includes(term) ||
      (todo.description ?? '').toLowerCase().includes(term) ||
      (todo.status ?? '').toLowerCase().includes(term) ||
      (todo.dueDate ?? '').includes(searchTerm)
    );
  });

  const formatStatus = (status) =>
    STATUS_OPTIONS.find(o => o.value === status)?.label ?? status;

  return (
    <section className='page'>
      <div className='container'>
        <h1>Todo App</h1>

        <div className='form-section'>
          <h2>{editingId ? 'Edit Todo' : 'Add Todo'}</h2>
          {firebaseError && (
            <p className='error-text form-error-banner' role='alert'>
              {firebaseError}
            </p>
          )}

          <form onSubmit={handleSubmit} className='todo-form'>
            <div className='form-group'>
              <label htmlFor='task'>Task *</label>
              <input
                type='text'
                id='task'
                name='task'
                value={formData.task}
                onChange={handleInputChange}
                placeholder='What needs to be done?'
                className={errors.task ? 'input-error' : ''}
              />
              {errors.task && <span className='error-text'>{errors.task}</span>}
            </div>

            <div className='form-group form-group--full'>
              <label htmlFor='description'>Description *</label>
              <textarea
                id='description'
                name='description'
                value={formData.description}
                onChange={handleInputChange}
                placeholder='Add details...'
                rows={3}
                className={errors.description ? 'input-error' : ''}
              />
              {errors.description && (
                <span className='error-text'>{errors.description}</span>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='status'>Status *</label>
              <select
                id='status'
                name='status'
                value={formData.status}
                onChange={handleInputChange}
                className={errors.status ? 'input-error' : ''}
              >
                {STATUS_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.status && <span className='error-text'>{errors.status}</span>}
            </div>

            <div className='form-group'>
              <label htmlFor='dueDate'>Due Date *</label>
              <input
                type='date'
                id='dueDate'
                name='dueDate'
                value={formData.dueDate}
                onChange={handleInputChange}
                className={errors.dueDate ? 'input-error' : ''}
              />
              {errors.dueDate && (
                <span className='error-text'>{errors.dueDate}</span>
              )}
            </div>

            <div className='form-group form-group--full'>
              <label htmlFor='attachment'>Attachment (optional)</label>
              <input
                type='file'
                id='attachment'
                // accept={ACCEPTED_FILE_TYPES.join(',')}
                onChange={handleFileChange}
                disabled={saving || uploadingFile}
              />
              <span className='file-hint'>Max 5 MB — images, PDF, or text</span>
              {errors.file && <span className='error-text'>{errors.file}</span>}

              {selectedFile && (
                <div className='file-preview'>
                  {filePreview && (
                    <img src={filePreview} alt='Preview' className='file-preview-img' />
                  )}
                  <span>{selectedFile.name}</span>
                  <button
                    type='button'
                    className='btn btn-secondary btn-sm'
                    onClick={clearFileSelection}
                  >
                    Remove
                  </button>
                </div>
              )}

              {!selectedFile && existingAttachment && (
                <div className='file-preview'>
                  <a
                    href={existingAttachment.fileUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {existingAttachment.fileName ?? 'View file'}
                  </a>
                  <button
                    type='button'
                    className='btn btn-secondary btn-sm'
                    onClick={() => setExistingAttachment(null)}
                  >
                    Remove file
                  </button>
                </div>
              )}
            </div>

            <div className='form-buttons'>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={saving || uploadingFile || deletingId !== null}
              >
                {saving || uploadingFile
                  ? uploadingFile
                    ? 'Uploading...'
                    : 'Saving...'
                  : editingId
                    ? 'Update Todo'
                    : 'Add Todo'}
              </button>
              {editingId && (
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={resetForm}
                  disabled={saving}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className='search-section'>
          <input
            type='text'
            placeholder='Search by task, description, status, or due date...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='search-input'
          />
          <span className='result-count'>
            {filteredTodos.length} of {todos.length} todos
          </span>
        </div>

        <div className='table-section'>
          <h2>Todo List</h2>

          {todos.length === 0 ? (
            <div className='empty-state'>
              <p>No todos yet. Add your first one above.</p>
            </div>
          ) : filteredTodos.length === 0 ? (
            <div className='empty-state'>
              <p>No todos match your search.</p>
            </div>
          ) : (
            <div className='table-wrapper'>
              <table className='todos-table'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Task</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th>Created At</th>
                    <th>File</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTodos.map((todo, index) => (
                    <tr
                      key={todo.id}
                      className={editingId === todo.id ? 'row-editing' : ''}
                    >
                      <td className='cell-index'>{index + 1}</td>
                      <td className='cell-task'>{todo.task}</td>
                      <td className='cell-description'>{todo.description}</td>
                      <td>
                        <span className={`status-badge status-${todo.status}`}>
                          {formatStatus(todo.status)}
                        </span>
                      </td>
                      <td className='cell-date'>{todo.dueDate}</td>
                      <td className='cell-date'>{todo.createdAt}</td>
                      <td className='cell-file'>
                        {todo.fileUrl ? (
                          <a
                            href={todo.fileUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            {todo.fileName ?? 'Download'}
                          </a>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className='cell-actions'>
                        <button
                          type='button'
                          className='btn btn-edit'
                          onClick={() => handleEdit(todo)}
                          disabled={saving || deletingId !== null}
                        >
                          Edit
                        </button>
                        <button
                          type='button'
                          className='btn btn-delete'
                          onClick={() => handleDelete(todo.id)}
                          disabled={deletingId === todo.id || saving}
                        >
                          {deletingId === todo.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {todos.length > 0 && (
          <div className='stats-section'>
            <div className='stat-card'>
              <span className='stat-label'>Total</span>
              <span className='stat-value'>{todos.length}</span>
            </div>
            <div className='stat-card'>
              <span className='stat-label'>Showing</span>
              <span className='stat-value'>{filteredTodos.length}</span>
            </div>
            <div className='stat-card'>
              <span className='stat-label'>Completed</span>
              <span className='stat-value'>
                {todos.filter(t => t.status === 'completed').length}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;
