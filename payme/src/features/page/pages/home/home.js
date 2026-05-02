import '../../../../shared/components/cards/card.css'
import './home.css'
import { Card } from '../../../../shared/components/cards/card.js';
import { formatToCardExpiration, formatToYearMonthDay } from '../../../../shared/utils/helpers/format-date.js';
import { formatCardNumber } from '../../../../shared/utils/helpers/format-card-number.js'
import { EmptyCard } from '../../../../shared/components/cards/empty-card.js';
import { Title } from '../../../../shared/components/title.js';
import { HandleApi } from '../../../../shared/utils/api.js'
import { monitorUserSession } from '../../../../shared/utils/helpers/verify-token.js'
import { AddCardServices } from '../../../../shared/components/services/card-services.js';
import { AddTransactionPreview } from '../../../../shared/components/transactions/transactions-preview.js';
import { modalListener } from '../../../../shared/utils/modal-listener.js';


export const getHome = async () => {

    await monitorUserSession()
    const encodedId = localStorage.getItem('userId');
    const userId = atob(encodedId);
    const { data: transactions } = await HandleApi.getTransactions({ id: userId })
    const { data: cards } = await HandleApi.getCards({ id: userId })
    const { data: user } = await HandleApi.getUser({ id: userId })
    await modalListener({ cards, user })
    Title(user[0].first_name + " " + user[0].first_lastname)
    AddCardServices()


    let countCard = 0;
    cards.forEach(element => {
        if (countCard < 2) {
            Card({
                cardNumber: formatCardNumber(element.card_number),
                expiredDate: formatToCardExpiration(element.expiration_date),
                cvv: element.cvv,
                balance: element.balance,
                cardName: user[0].first_name
            })
            countCard++
        }
    });
    if (cards.length === 1) {
        EmptyCard()
    } else if (cards.length === 0) {
        EmptyCard()
        EmptyCard()
    }


    transactions.forEach(element => {
        const description = element.message.length === 0 ? 'No description' : element.message
        AddTransactionPreview({
            description: description,
            date: formatToYearMonthDay(element.created_at),
            type: element.type,
            amount: element.amount
        })
    });





}