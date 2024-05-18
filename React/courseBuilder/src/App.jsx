import React, { useState } from 'react';
import AddButton from './components/AddButton';
import emptyBox from './Assets/emptyBox.png';
import AddModal from './components/AddModal';
import Module from './components/Module';

function App() {
  const [empty, setEmpty] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modules, setModules] = useState([]);

  const addModule = (moduleName) => {
    setModules([...modules, moduleName]);
    setEmpty(false);
    setModalVisible(false);
  };

  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="flex justify-between px-60 py-20">
        <h1><b>Course Builder</b></h1>
        <AddButton onOpenModal={() => setModalVisible(true)} />
      </div>
      {empty ? (
        <div className="flex flex-col justify-center items-center">
          <img src={emptyBox} className='w-[250px] h-[200px]' />
          <h1><b>Nothing added here yet</b></h1>
          <h1>Click on the [+] Add button to add items to this course</h1>
        </div>
      ) : (
        modules.map((module, index) => <Module key={index} moduleName={module} />)
      )}
      <AddModal modalVisible={modalVisible} setModalVisible={setModalVisible} addModule={addModule} />
    </div>
  );
}

export default App;
