import cart from './modules/cart.js'
import search from './modules/search.js'
import getGoods from './modules/getGoods.js'
import smoothScroll from './modules/smoothScroll.js'
import slider from './modules/slider.js'

const copiright = document.querySelector('.copiright')
const date = new Date()
copiright.innerHTML = date.getFullYear()
cart()
search()
getGoods()
smoothScroll()