import { useRef } from 'react'
import { FiCheckSquare } from 'react-icons/fi'

import { Form } from './styles'
import Modal from '../Modal/index'
import Input from '../Input'

interface FoodType {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string
}

interface ModalEditFoodProps {
  isOpen: boolean;
  editingFood: FoodType;
  setIsOpen: () => void;
  handleUpdateFood: (food: FoodType) => void; 
}

export default function ModalEditFood({isOpen, setIsOpen, handleUpdateFood, editingFood}: ModalEditFoodProps) {

  const formRef = useRef(null)

  async function handleSubmit(data: FoodType) {
    handleUpdateFood(data)
    setIsOpen()
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />
        
        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="image" placeholder="Ex: 19.90" />
        
        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <p className="text">Editar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}