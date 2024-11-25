import { useSelector } from "react-redux"

const SelectText = () => {
    const Image = useSelector((state: string) => state.data.Images);
  return (
    <div>
        <img src={Image} alt="Image-preview" />
    </div>
  )
}

export default SelectText