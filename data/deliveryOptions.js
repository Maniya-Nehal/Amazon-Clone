import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
export const deliveryOptions=[{ 
    id:"1",
    deliveryDay: 7,
    priceCents:0

},
{
    id:"2",
    deliveryDay: 3,
    priceCents:499
},
{
    id:"3",
    deliveryDay: 1,
    priceCents:999
}];
// export function deliveryoptionhtml(deliveryOption){
//     const today = dayjs();
//     const deliverydate = today.add(deliveryOption.deliveryDay, 'days');
    
//     let remainingDays = deliveryOption.deliveryDay;
//     let deliveryDate = dayjs();

//     while (remainingDays > 0) {
//         deliveryDate = deliveryDate.add(1, 'day');

//         if (!isWeekend(deliveryDate)) {
//         remainingDays--;
//         // This is a shortcut for:
//         // remainingDays = remainingDays - 1;
//         }
//     }
//     const dateString = deliverydate.format('dddd MMMM D');
//     return dateString;

// }
// function isWeekend(date) {
//     const dayOfWeek = date.format('dddd');
//     return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
//   }
export function deliveryoptionhtml(deliveryOption) {
    const today = dayjs();
    let remainingDays = deliveryOption.deliveryDay;
    let deliveryDate = today;

    while (remainingDays > 0) {
        deliveryDate = deliveryDate.add(1, 'day');
        if (!isWeekend(deliveryDate)) {
            remainingDays--;
        }
    }

    const dateString = deliveryDate.format('dddd MMMM D');
    return dateString;
}

function isWeekend(date) {
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}
