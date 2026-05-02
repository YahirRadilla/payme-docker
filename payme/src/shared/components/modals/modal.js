import './modal.css'
import { transferContent } from './transfer-content'
import { withdrawalContent } from './withdrawal-content'
import { serviceContent } from './service-content'
import { depositContent } from './deposit-content'
import { confirmationContent } from './confirmation-content.js'
import { notyf } from '../toast.js'
import { HandleApi } from '../../utils/api'


const depositFormEventListener = async ({ user }) => {
    const depositForm = document.getElementById('deposit-form')
    depositForm.addEventListener('submit', async e => {
        e.preventDefault()

        const depositData = Object.fromEntries(
            new FormData(e.target)
        )

        if (!depositData.depositSourceCard || !depositData.depositDestinationCard) {
            notyf.error('Select a card')
            return
        }

        if (depositData.depositSourceCard === depositData.depositDestinationCard) {
            notyf.error('You can not deposit to the same card')
            return
        }

        const data = await HandleApi.postDeposit({ id: user[0].id, sourceCard: depositData.depositSourceCard, destinationCard: depositData.depositDestinationCard, amount: depositData.amount })

        if (data.success) {
            notyf.success(data.message)
            setTimeout(() => {
                location.reload()
            }, 500);
            return
        }
        notyf.error(data.message)

    })
}

const transferFormEventListener = async ({ user }) => {
    const transferForm = document.getElementById('transfer-form')
    transferForm.addEventListener('submit', async e => {
        e.preventDefault()

        const transferData = Object.fromEntries(
            new FormData(e.target)
        )

        if (!transferData.transfer_card_select) {
            notyf.error('Select a card')
            return
        }

        const data = await HandleApi.postTransfer({ id: user[0].id, recipientEmail: transferData.email, sourceCard: transferData.transfer_card_select, amount: transferData.amount, message: transferData.message })


        if (data.success) {
            notyf.success(data.message)
            setTimeout(() => {
                location.reload()
            }, 500);
            return
        }
        notyf.error(data.message)

    })
}

const serviceFormEventListener = async ({ user }) => {
    const serviceForm = document.getElementById('service-form')
    serviceForm.addEventListener('submit', async e => {
        e.preventDefault()

        const serviceData = Object.fromEntries(
            new FormData(e.target)
        )

        if (!serviceData.service_card_select) {
            notyf.error('Select a card')
            return
        }

        const data = await HandleApi.postService({ id: user[0].id, sourceCard: serviceData.service_card_select, serviceName: serviceData.service_select, reference: serviceData.reference, amount: serviceData.amount })


        if (data.success) {
            notyf.success(data.message)
            setTimeout(() => {
                location.reload()
            }, 500);
            return
        }
        notyf.error(data.message)

    })
}

const withdrawalFormEventListener = async ({ user }) => {
    const withdrawalForm = document.getElementById('withdrawal-form')
    withdrawalForm.addEventListener('submit', async e => {
        e.preventDefault()

        const withdrawalData = Object.fromEntries(
            new FormData(e.target)
        )

        if (!withdrawalData.withdrawal_card_select) {
            notyf.error('Select a card')
            return
        }



        const data = await HandleApi.postWithdrawal({ id: user[0].id, sourceCard: withdrawalData.withdrawal_card_select, amount: withdrawalData.amount })


        if (data.success) {
            notyf.success(data.message)
            setTimeout(() => {
                location.reload()
            }, 500);
            return
        }
        notyf.error(data.message)

    })
}

const confirmationClickEventListener = async ({ user }) => {
    const deleteButton = document.getElementById('delete_account')
    deleteButton.addEventListener('click', async e => {

        const data = await HandleApi.patchDeactivateUser({ id: user[0].id })

        if (data.success) {
            notyf.success(data.message)
            setTimeout(async () => {
                localStorage.removeItem('userId');
                const data = await HandleApi.logout()
                notyf.success(data.message)
                window.location.href = `/login`
            }, 500);
            return
        }
        notyf.error(data.message)

    })
}



export const Modal = async ({ type, cards, user }) => {



    const modal = document.getElementById('modal-content')

    switch (type) {
        case 'transfer':
            modal.innerHTML = `${transferContent({ cards })}`
            await transferFormEventListener({ user })
            break;
        case 'payment':
            modal.innerHTML = `${serviceContent({ cards })}`
            await serviceFormEventListener({ user })
            break;
        case 'deposit':
            modal.innerHTML = `${depositContent({ cards })}`
            await depositFormEventListener({ user })
            break;
        case 'withdrawal':
            modal.innerHTML = `${withdrawalContent({ cards })}`
            await withdrawalFormEventListener({ user })
            break;
        case 'confirmation':
            modal.innerHTML = `${confirmationContent()}`
            await confirmationClickEventListener({ user })
            break;
    }


};
