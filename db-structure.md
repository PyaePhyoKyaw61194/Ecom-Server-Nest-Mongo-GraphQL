```
tags{
    type
    color
    name
}

permission{
    description
    name
}

setting(status){
    color
    name
}

roles {
    permissions
        [id]
    name
    description
}

users {
    code
    email
    password
    profile {
        name
        password
        facebook
    }
    roleId
}

products{
    name
    code
    description
    price
    quantity
    isAvailable
    tags
        [id]
}

order {
    orderCustomerId
    status
    deliveryFee
    internalRemark
    customerRemark
    deliveryDate
    orderDate
    paymentType
    tags
        [id]
    orderItems
        [
            {
                boughtPrice
                boughtQuantity
                productId
                productName
            }
        ]
    toDeliverCustomer{
        name
        phone
        secondaryPhone
        address {
            fullAdress
            township
            region{
                code
                regionId
            }
        }
    }
}



```
