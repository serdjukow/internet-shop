const smoothScroll = () => {
	const scrollLinks = document.querySelectorAll('.scroll-link')
	scrollLinks.forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault()
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			})
		})
	})
}

export default smoothScroll