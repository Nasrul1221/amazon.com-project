import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function calculateDeliveryDate(deliveryOption) {
    let deliveryDate = dayjs();
    let count = deliveryOption.days;

    while (count > 0) {
        deliveryDate = deliveryDate.add(1, 'day');
        if (deliveryDate.day() !== 6 && deliveryDate.day() !== 0) {
            count--;
        }
        else {continue}
    }

    return deliveryDate;
}