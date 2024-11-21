import {Modal, Progres} from './Component/components'
import {ModalData} from './data/index';
import './App.css'


const App = () => {

  return (
    <div className='wrapper'>
      <Modal description={ModalData[0]} helloModal={true}/>
        <div className='main'>
          <Progres/>
        </div>
    </div>
  )
}

export default App