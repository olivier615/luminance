import { createAsyncThunk, createSlice, type PayloadAction  } from "@reduxjs/toolkit";

type MessageData = {
  id: string
  type: 'success' | 'danger'
  title: string
  text: string
}

type CreateMessagePayload = {
  success: boolean
  message: string
}

const initialState: MessageData[] = []

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
  createMessage(state, action: PayloadAction<{
    id: string
    success: boolean
    message: string
  }>) {
    state.push({
      id: action.payload.id,
      type: action.payload.success ? 'success' : 'danger',
      title: action.payload.success ? '成功' : '失敗',
      text: action.payload.message
    })
  },

  removeMessage(state, action: PayloadAction<string>) {
    const index = state.findIndex(message => message.id === action.payload)
    if (index !== -1) state.splice(index, 1)
  }
}
})

export const createAsyncMessage = createAsyncThunk<
  void,
  CreateMessagePayload
>(
  'message/createAsyncMessage',
  async (payload, { dispatch, requestId }) => {
    dispatch(createMessage({
      ...payload,
      id: requestId
    }))

    setTimeout(() => {
      dispatch(removeMessage(requestId))
    }, 2500)
  }
)

export const { createMessage, removeMessage } = messageSlice.actions

export default messageSlice.reducer