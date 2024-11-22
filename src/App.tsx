import {Modal, Progres, Header, MainAction} from './Component/components'
import Button from './UI/Button';
import {ModalData} from './data/index';
import './App.css'


const App = () => {

  return (
    <div className='wrapper'>
      <Modal description={ModalData[0]} helloModal={true}/>
        <div className='main'>
          <Header/>
          <Progres stepNumbers={1}/>
          <MainAction stepsNumber={1}/>
          <div className='buttons'>
            <Button children='Back' active={false} width='184px' />
            <Button children='Next' active={false} width='184px' />
          </div>
        </div>
    </div>
  )
}

export default App