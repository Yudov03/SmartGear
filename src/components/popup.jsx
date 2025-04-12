import ReactDOM from 'react-dom';
import React from 'react';


function LogoutConfirmModal({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">Xác nhận đăng xuất</h2>
        <p className="mb-6">Bạn có chắc chắn muốn đăng xuất không?</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default LogoutConfirmModal;
