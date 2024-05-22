import React, { useState } from 'react';
import AddButton from './components/AddButton';
import emptyBox from './Assets/emptyBox.png';
import AddModal from './components/AddModal';
import Module from './components/Module';
import AddLinkModal from './components/AddLinkModal';

function App() {
  const [empty, setEmpty] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [linkModalVisible, setLinkModalVisible] = useState(false);
  const [modules, setModules] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [links, setLinks] = useState([]);

  const addModule = (moduleName) => {
    setModules([...modules, moduleName]);
    setEmpty(false);
    setModalVisible(false);
  };

  const delModule = (index) => {
    const newModules = modules.filter((_, i) => i !== index);
    setModules(newModules);
    if (newModules.length === 0) setEmpty(true);
  };

  const editModule = (index, newModuleName) => {
    const newModules = modules.map((module, i) => (i === index ? newModuleName : module));
    setModules(newModules);
  };

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setEmpty(false);
  };

  const addLink = (link) => {
    setLinks([...links, link]);
    setEmpty(false);
    setLinkModalVisible(false);
  };

  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="flex justify-between px-60 py-20">
        <h1><b>Course Builder</b></h1>
        <AddButton onOpenModal={() => setModalVisible(true)} onFileUpload={handleFileUpload} onAddLink={() => setLinkModalVisible(true)} />
      </div>
      {empty ? (
        <div className="flex flex-col justify-center items-center">
          <img src={emptyBox} className='w-[250px] h-[200px]' />
          <h1><b>Nothing added here yet</b></h1>
          <h1>Click on the [+] Add button to add items to this course</h1>
        </div>
      ) : (
        <>
          {modules.map((module, index) => (
            <Module
              key={index}
              index={index}
              moduleName={module}
              delModule={delModule}
              editModule={editModule}
            />
          ))}
          {uploadedFile && (
            <div className="flex justify-center items-center">
              <div className='flex justify-between w-[1000px] bg-white p-4'>
                <div className='flex justify-center items-center gap-2'>
                  <span>File Uploaded: {uploadedFile.name}</span>
                </div>
              </div>
            </div>
          )}
          {links.map((link, index) => (
            <div key={index} className="flex justify-center items-center">
              <div className='flex justify-between w-[1000px] bg-white p-4'>
                <div className='flex justify-center items-center gap-2'>
                <span>Link Name: {link.name}</span>
                  <span>URL: {link.url}</span>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      <AddModal modalVisible={modalVisible} setModalVisible={setModalVisible} addModule={addModule} />
      <AddLinkModal visible={linkModalVisible} onClose={() => setLinkModalVisible(false)} onAddLink={addLink} />
    </div>
  );
}

export default App;

