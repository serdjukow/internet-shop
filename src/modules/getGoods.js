const getGoods = () => {
	const links = document.querySelectorAll('.navigation-link')
	const more = document.querySelector('.more')

	const renderGoods = goods => {
		const goodsContainer = document.querySelector('.long-goods-list')
		const shortGoods = document.querySelector('.short-goods')
		if (goodsContainer) {
			goodsContainer.innerHTML = ''
		}
		if (shortGoods) {
			shortGoods.innerHTML = ''
		}
		goods.forEach(good => {
			const goodBlock = document.createElement('div')
			goodBlock.classList.add('col-lg-3')
			goodBlock.classList.add('col-sm-6')
			goodBlock.innerHTML = `
				<div class="goods-card">
					<span class="label ${good.label ? null : 'd-none'}">${good.label}</span>
					<img src="db/${good.img}" alt="${good.name}" class="goods-image" />
					<h3 class="goods-title">${good.name}</h3>
					<p class="goods-description">${good.description}</p>
					<button class="button goods-card-btn add-to-cart" data-id="${good.id}">
						<span class="button-price">$${good.price}</span>
					</button>
				</div>
			`

			goodsContainer.append(goodBlock)
			if (shortGoods) {
				const goodBlockNew = document.createElement('div')
				goodBlockNew.classList.add('col-lg-3')
				goodBlockNew.classList.add('col-sm-6')
				goodBlockNew.innerHTML = `
				<div class="goods-card">
					<span class="label ${good.label ? null : 'd-none'}">${good.label}</span>
					<img src="db/${good.img}" alt="${good.name}" class="goods-image" />
					<h3 class="goods-title">${good.name}</h3>
					<p class="goods-description">${good.description}</p>
					<button class="button goods-card-btn add-to-cart" data-id="${good.id}">
						<span class="button-price">$${good.price}</span>
					</button>
				</div>
			`
				shortGoods.append(goodBlockNew)
			}
		})
	}

	const renderNewGoods = goods => {
		const shortGoods = document.querySelector('.short-goods')
		if (shortGoods) {
			shortGoods.innerHTML = ''
		}
		goods.forEach(good => {
			if (shortGoods) {
				const goodBlockNew = document.createElement('div')
				goodBlockNew.classList.add('col-lg-3')
				goodBlockNew.classList.add('col-sm-6')
				goodBlockNew.innerHTML = `
				<div class="goods-card">
					<span class="label ${good.label ? null : 'd-none'}">${good.label}</span>
					<img src="db/${good.img}" alt="${good.name}" class="goods-image" />
					<h3 class="goods-title">${good.name}</h3>
					<p class="goods-description">${good.description}</p>
				</div>
			`
				shortGoods.append(goodBlockNew)
			}
		})
	}

	const sendRequest = async (linkValue, category) => {
		const url = '../db/db.json'
		const response = await fetch(url)
		const bd = await response.json()
		const array = category ? bd.filter(item => item[category] === linkValue) : bd
		localStorage.setItem('goods', JSON.stringify(array))

		if (window.location.pathname !== '/goods.html') {
			window.location.href = '/goods.html'
		} else if (window.location.pathname === '/index.html') {
			renderNewGoods(bd.filter(item => item.label === 'New'))
		} else {
			renderGoods(array)
		}
	}

	links.forEach(link => {
		link.addEventListener('click', e => {
			e.preventDefault()
			const linkValue = link.textContent
			const category = link.dataset.field
			sendRequest(linkValue, category)
		})
	})

	if (localStorage.getItem('goods') && window.location.pathname === '/goods.html') {
		renderGoods(JSON.parse(localStorage.getItem('goods')))
	}

	if (more) {
		more.addEventListener('click', e => {
			e.preventDefault()
			sendRequest()
		})
	}
}

export default getGoods
