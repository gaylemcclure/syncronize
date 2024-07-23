import dayjs from 'dayjs'

 export default function formatDate (date) {

    const dateString = dayjs(date).format('DD/MM/YYYY');

    return dateString;
}