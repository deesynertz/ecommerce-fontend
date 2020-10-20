import { environment } from 'src/environments/environment';



export const base_url = environment.production ? 'http://localhost:/' : 'http://localhost:3000/api'

export const productUrl = base_url + '/products'
export const productByIdUrl = base_url + '/products/'
export const productByCategoryUrl = base_url + '/products/category/'


export const categoriesUrl = base_url + '/categories'


export const singleOrderUrl = base_url + '/orders/'
export const newOrderUrl = base_url + '/orders/new'
export const paymentOrderUrl = base_url + '/orders/payment'

export const userRoleUrl = base_url + '/auth/roles'
export const loginUserUrl = base_url + '/auth/login'
export const registerUserUrl = base_url + '/auth/register'
export const findUserByEmailUrl = base_url + '/auth/'
