import { Modal } from "../components/modals/modal"

export const modalListener = async ({ cards, user }) => {

    document.addEventListener("click", async (event) => {


        const modal = document.getElementById('modal-1')
        const classList = event.target.classList
        if (classList.contains('modal__btn') || classList.contains('modal__close')) {
            modal.classList.add('modal-none')
            modal.classList.remove('micromodal-slide.is-open')
        }

        if (classList.contains('transfer-item')) {
            await Modal({ type: classList[0], cards, user })
            modal.classList.add('micromodal-slide.is-open')
            modal.classList.remove('modal-none')
        }

        if (classList.contains('payment-item')) {
            await Modal({ type: classList[0], cards, user })
            modal.classList.add('micromodal-slide.is-open')
            modal.classList.remove('modal-none')
        }

        if (classList.contains('deposit-item')) {
            await Modal({ type: classList[0], cards, user })
            modal.classList.add('micromodal-slide.is-open')
            modal.classList.remove('modal-none')
        }

        if (classList.contains('withdrawal-item')) {
            await Modal({ type: classList[0], cards, user })
            modal.classList.add('micromodal-slide.is-open')
            modal.classList.remove('modal-none')
        }

        if (classList.contains('confirmation')) {
            await Modal({ type: 'confirmation', cards: null, user })
            modal.classList.add('micromodal-slide.is-open')
            modal.classList.remove('modal-none')
        }
    })
}