import {bookStore} from './BookStore';
import {paymentStore} from './PaymentStore'
import {myBooksStore} from './MyBooksStore'
import { authStore } from './AuthStore'

export const rootStore = {
  bookStore,
  paymentStore,
  myBooksStore,
  authStore
}