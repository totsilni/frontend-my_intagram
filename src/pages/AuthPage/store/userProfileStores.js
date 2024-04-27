import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const counterSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfile: (state, userProfile) =>{
        state.value = userProfile;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserProfile } = counterSlice.actions

export default counterSlice.reducer