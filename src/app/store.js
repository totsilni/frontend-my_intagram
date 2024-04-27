import { configureStore } from '@reduxjs/toolkit'
import  UserProfile  from '../store/userProfileStores'
export const store = configureStore({
  reducer: {
    userProfile: UserProfile
  },
})