import React, { useState } from 'react';
import { VscChromeClose } from "react-icons/vsc";

function AddLinkModal({ visible, onClose, onAddLink }) {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');

  const handleAddLink = () => {
    if (url && name) {
      onAddLink({ url, name });
      onClose();
    }
  };

  return (
    <>
      {visible && (
        <div className='fixed inset-0 flex items-center justify-center bg-black-800 bg-opacity-50 backdrop-blur-3xl'>
          <div className='w-[350px] h-[210px] flex flex-col bg-white gap-5 p-5'>
            <div className='flex justify-between'>
              <h1><b>Add a Link</b></h1>
              <button onClick={onClose}><VscChromeClose /></button>
            </div>
            <div>
              <h1>URL</h1>
              <input
                className='w-full border p-2 rounded'
                type="text"
                placeholder="Enter URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div>
              <h1>Name</h1>
              <input
                className='w-full border p-2 rounded'
                type="text"
                placeholder="Enter display name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='flex gap-3 justify-end'>
              <button className='border p-2 rounded' onClick={onClose}>Cancel</button>
              <button className='bg-green-800 border p-2 rounded text-white' onClick={handleAddLink}>Add Link</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddLinkModal;
