import Swal from 'sweetalert2'
import { apiAdminDeleteOrder } from '../../apis/order'


type ConfirmDeleteModalProps = {
  orderId: string
  onDeleted: () => void
}

const deleteOrder = async (id: string) => {
  const response = await apiAdminDeleteOrder(id)
  return response.data
}

export const ConfirmDeleteOrder = ({
  orderId,
  onDeleted
}: ConfirmDeleteModalProps) => {
  const showAlert = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger me-2',
      },
      buttonsStyling: false,
    })

    const result = await swalWithBootstrapButtons.fire({
      title: '確定刪除此訂單?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '刪除',
      cancelButtonText: '取消',
      reverseButtons: true,
    })
    if (!result.isConfirmed) {
      await swalWithBootstrapButtons.fire({
        title: '已取消',
        text: 'Nothing happened! :)',
        icon: 'info',
      })
      return
    }
    try {
      await deleteOrder(orderId)
      await swalWithBootstrapButtons.fire({
        title: 'Done!',
        text: '已刪除訂單',
        icon: 'success',
      })
      onDeleted()
    } catch (error) {
      await swalWithBootstrapButtons.fire({
        title: '刪除失敗',
        text: '請稍後再試',
        icon: 'error',
      })
    }
  }

  return (
    <button
      onClick={showAlert}
      type="button"
      className="btn btn-outline-danger btn-sm"
    >
      刪除訂單
    </button>
  )
}