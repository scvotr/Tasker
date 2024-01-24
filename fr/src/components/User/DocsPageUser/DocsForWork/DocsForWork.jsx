import { useState } from 'react'
import { Modal } from '../../../Modal/Modal'
import './DocsForWork.css'
import { DocsTestForm } from '../DocsTestForm/DocsTestForm'
import { V2DocsTestForm } from '../V2DocsTestForm/V2DocsTestForm'

export const DocsForWork = () => {
  const [openModal, setOpenModal] = useState(false)

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  return (
    <div>
      <button onClick={() => setOpenModal(true)}>Создать документ PDF + подпись</button>
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        {/* <DocsTestForm/> */}
        <V2DocsTestForm/>
      </Modal>

      

    </div>
  )
}