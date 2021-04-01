import { useEffect, useState } from "react";
import Header from "../../components/Header";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";
import Food from '../../components/Food/index3';
import api from "../../services/api";
import { FoodsContainer } from "./styles";

interface FoodType {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string
}

export default function Dashboard() {

  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [foods, setFoods] = useState<FoodType[]>([])
  const [editingFood, setEditingFood] = useState({} as FoodType)

  useEffect(() => {
    async function loadFoods() {
      const response = await api.get('/foods')

      setFoods(response.data)
    }

    loadFoods()
  }, [])

  function toogleModal() {
    setModalOpen(!modalOpen)
  }

  function toogleEditModal() {
    setEditModalOpen(!editModalOpen)
  }

  async function handleAddFood(food: FoodType) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true
      })

      setFoods([...foods, response.data])
    } catch (error) {
      console.log(error)
    }
  }

  async function handleUpdateFood(food: FoodType) {

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        {...editingFood, ...food}
      );

      const foodsUpdated = foods.map(f => 
        f.id !== foodUpdated.data.id ? f : foodUpdated.data  
      )

      setFoods(foodsUpdated)
    } catch (error) {
      console.log(error)
    }

    
  }

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`)

    const foodsFiltered = foods.filter(food => food.id !== id)

    setFoods(foodsFiltered)
  }

  async function handeEditFood(food: FoodType) {
    setEditingFood(food)
    setEditModalOpen(true)
  }

  return (
    <>
      <Header openModal={toogleModal} />
      <ModalAddFood 
        isOpen={modalOpen}
        setIsOpen={toogleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood 
        isOpen={editModalOpen}
        setIsOpen={toogleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />
      <FoodsContainer data-testid="foods-list">
        {foods && 
          foods.map(food => (
            <Food 
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handeEditFood}
            />
          ))
        }
      </FoodsContainer>
    </>
  )
}