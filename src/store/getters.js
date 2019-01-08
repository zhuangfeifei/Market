

export default {
    htmls: state => state.html.replace(/;/g,'').replace(/&gt/g,'>').replace(/&lt/g,'<').replace(/&apos/g,"'").replace(/&quot/g,"\\"),

    coupons: state => {
        let list = state.mySelfRedPacketList, array = []
        for(let val of list){
            array.push({
                available: 1,
                discount: 0,
                denominations: val.price*100,
                originCondition: val.use_codition == 0 ? 0 : val.condition_price*100,
                reason: '',
                value: 150,
                name: val.title,
                startAt: new Date(val.limit_date_start.replace(/-/g, "/")).getTime()/1000,
                endAt: new Date(val.limit_date_end.replace(/-/g, "/")).getTime()/1000,
                couponId: val.couponId
            })
        }
        return array
    },
}

