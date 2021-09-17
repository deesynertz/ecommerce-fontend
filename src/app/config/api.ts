import { environment } from 'src/environments/environment';

// BASE URL
export const base_url = environment.production ? 'http://your remove server/api' : 'http://localhost:3000/api';

// CATEGORIES
export const categoriesUrl = base_url + '/categories';

// PRODUCTS
export const productsUrl = base_url + '/products';
export const productImageUrl = base_url + '/products/image/new';
export const productAddNewUrl = base_url + '/products/add-new';
export const productByIdUrl = base_url + '/products/';
export const productByCategoryUrl = base_url + '/products/category/';
export const productRemoveUrl = base_url + '/products/delete/';

// ORDERS
export const ordersAllUrl = base_url + '/orders';
export const orderSingleUrl = base_url + '/orders/';
export const orderNewUrl = base_url + '/orders/create';
export const ordersForSellerUrl = base_url + '/orders/seller/';
export const ordersForBuyerUrl = base_url + '/orders/buyer/';
export const orderDeleteSingleUrl = base_url + '/orders/delete/';

// AUTH
export const authLoginUrl = base_url + '/auth/login';
export const authRegisterUrl = base_url + '/auth/register';
export const authFindByEmailUrl = base_url + '/auth/email/';

// USERS & ROLES
// 1: roles
export const rolesByAdminUrl = base_url + '/users/roles';
export const rolesOtherUrl = base_url + '/users/roles/others';
// 2: Users
export const userProfileUrl = base_url + '/users/profile/';
export const userProductsUrl = base_url + '/users/products/';

// PAYMENT
//export const paymentForNewOrderUrl = base_url + '/payment/new-offline';
export const paymentForNewOrderUrl = base_url + '/payment/new-online';



