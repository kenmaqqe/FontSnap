import { Modal, Progres, Header, UploadImage, SelectText , Result  } from "./Component/components";
import Button from "./UI/Button";
import { ModalData } from "./data/index";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { setSteps, setFirstButton, setSecondButton } from "./redux/dataSlice";

const App = () => {
  const Steps = useSelector((state: any) => state.data.Steps);
  const FirstButton = useSelector((state: any) => state.data.firstButton);
  const SecondButton = useSelector((state: any) => state.data.secondButton); 
  const dispatch = useDispatch();

  const NextSteps = () => {
    if (Steps === 1) {
      dispatch(setSteps(2));
      dispatch(setSecondButton(true))
    } else if (Steps === 2) {
      dispatch(setSteps(3));
      dispatch(setFirstButton(false));
    }
  };
  const PrevSteps = () => {
    if (Steps === 2) {
      dispatch(setSteps(1));
      dispatch(setSecondButton(false));
      dispatch(setFirstButton(false));
    } else if (Steps === 3) {
      dispatch(setSteps(2));
      dispatch(setFirstButton(true));
    }
  };

  return (
    <div className="wrapper">
      <Modal description={ModalData[0]} helloModal={true} />
      <div className="main">
        <Header />
        <Progres stepNumbers={Steps} />
        {Steps === 1 && <UploadImage/>}
        {Steps === 2 && <SelectText/>}
        {Steps === 3 && <Result/>}
        <div className="buttons">
          <Button
            children="Back"
            active={SecondButton}
            width="184px"
            onClick={PrevSteps}
          />
          <Button
            children="Next"
            active={FirstButton}
            width="184px"
            onClick={NextSteps}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
