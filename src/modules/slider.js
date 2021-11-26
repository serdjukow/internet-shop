//import Swiper from 'swiper'
//import { Swiper } from 'swiper'


//Swiper.use([Navigation])

const slider = () => {
	console.log('hi-hi')
	try {
		const swiper = new Swiper('.mySwiper', {
			loop: true,

			// Navigation arrows
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		})
	} catch (e) {
		console.error(e.message)
	}
}
export default slider 
