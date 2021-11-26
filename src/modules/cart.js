const cart = function () {
	const cartBtn = document.querySelector('.button-cart')
	const cart = document.querySelector('#modal-cart')
	const modalClose = document.querySelector('.modal-close')
	const goodsContainer = document.querySelector('.long-goods-list')
	const cartTable = document.querySelector('.cart-table__goods')
	const modalForm = document.querySelector('.modal-form')
	const cartCount = document.querySelector('.cart-count')
	const modalInputName = document.querySelector('.input-name')
	const modalInputPhone = document.querySelector('.input-phone')
	const cardTableTotal = document.querySelector('.card-table__total')


	
	const deleteCartItem = id => {
		const cardArray = JSON.parse(localStorage.getItem('cart'))
		const newCart = cardArray.filter(good => {
			return good.id !== id
		})
		localStorage.setItem('cart', JSON.stringify(newCart))
		renderCartGoods(JSON.parse(localStorage.getItem('cart')))
	}

	const plusCartItem = id => {
		const cardArray = JSON.parse(localStorage.getItem('cart'))
		const newCart = cardArray.map(good => {
			if (good.id === id) {
				good.count++
			}
			return good
		})
		localStorage.setItem('cart', JSON.stringify(newCart))
		renderCartGoods(JSON.parse(localStorage.getItem('cart')))
	}

	const minusCartItem = id => {
		const cardArray = JSON.parse(localStorage.getItem('cart'))
		const newCart = cardArray.map(good => {
			if (good.id === id) {
				if (good.count > 0) {
					good.count--
				}
			}
			return good
		})
		localStorage.setItem('cart', JSON.stringify(newCart))
		renderCartGoods(JSON.parse(localStorage.getItem('cart')))
	}

	const addToCart = goodId => {
		const goods = JSON.parse(localStorage.getItem('goods'))
		const clickedGood = goods.find(good => good.id === goodId)
		const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

		if (cart.some(good => good.id === clickedGood.id)) {
			cart.map(good => {
				if (good.id === clickedGood.id) {
					good.count++
				}
				return good
			})
		} else {
			clickedGood.count = 1
			cart.push(clickedGood)
		}
		localStorage.setItem('cart', JSON.stringify(cart))
	}

	const renderCartGoods = goods => {
		cartTable.innerHTML = ''
		goods.forEach(good => {
			const tr = document.createElement('tr')
			tr.innerHTML = `
				<td>${good.name}</td>
				<td>${good.price}$</td>
				<td><button ${!good.count ? 'disabled' : ''} class="cart-btn-minus"">-</button></td>
				<td>${good.count}</td>
				<td><button class="cart-btn-plus">+</button></td>
				<td>${+good.price * +good.count}</td>
				<td><button class="cart-btn-delete"">x</button></td>
			`
			cartTable.append(tr)
			tr.addEventListener('click', e => {
				if (e.target.classList.contains('cart-btn-minus')) {
					minusCartItem(good.id)
					cardCounter()
					priceCounter()
				} else if (e.target.classList.contains('cart-btn-plus')) {
					plusCartItem(good.id)
					cardCounter()
					priceCounter()
				} else if (e.target.classList.contains('cart-btn-delete')) {
					deleteCartItem(good.id)
					cardCounter()
					priceCounter()
				}
			})
		})
	}

	const cardCounter = () => {
		const cardArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
		cartCount.innerHTML = cardArray.map(item => item.count).reduce((prev, curr) => prev + curr, 0)
	}
	cardCounter()

	const priceCounter = () => {
		const cardArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

		let arr = []
		cardArray.forEach(item => {
			arr.push(item.count * item.price)
		})
		cardTableTotal.innerHTML = arr.map(item => item).reduce((prev, curr) => prev + curr, 0)
	}
	priceCounter()

	cart.addEventListener('click', e => {
		if (!e.target.closest('.modal') && e.target.classList.contains('overlay')) {
			cart.style.display = ''
		}
	})

	const sendForm = () => {
		const cardArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

		fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: JSON.stringify({
				cardArray: cardArray,
				name: modalInputName.value,
				phone: modalInputPhone.value,
			}),
		}).then(() => {
			cart.style.display = ''
			localStorage.removeItem('cart')
			cardCounter()
			priceCounter()
		})
	}

	modalForm.addEventListener('submit', e => {
		e.preventDefault()
		sendForm()
	})

	cartBtn.addEventListener('click', () => {
		const cardArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

		renderCartGoods(cardArray)
		cart.style.display = 'flex'
	})

	modalClose.addEventListener('click', () => {
		cart.style.display = ''
	})

	window.addEventListener('keydown', e => {
		if (e.key === 'Escape') {
			cart.style.display = ''
		}
	})

	if (goodsContainer) {
		goodsContainer.addEventListener('click', e => {
			if (e.target.closest('.add-to-cart')) {
				const buttonToCart = e.target.closest('.add-to-cart')
				const goodId = buttonToCart.dataset.id
				addToCart(goodId)
				cardCounter()
				priceCounter()
			}
		})
	}
}

export default cart
