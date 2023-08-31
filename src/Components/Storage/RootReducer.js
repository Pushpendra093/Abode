const initialState = { 
    vendor:{},
    properties:{},
    subProperties:{},
    description:{},
    address:{},
    guest:{},
    amenities:{},
    picture:{},
    extraInfo:{},
    lastInfo:{},
    user:{},
    vendorDBData:{}
}

export default function RootReducer(state=initialState,action)
{
    switch(action.type)
    {
        case 'ADD_VENDOR':
            state.vendor[action.payload[0]]=action.payload[1]
           // console.log("REDUX",state.vendor)
           return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,lastInfo:state.lastInfo,picture:state.picture,user:state.user})

        case 'ADD_PROPERTIES':
            state.properties[action.payload[0]]=action.payload[1]
            return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,lastInfo:state.lastInfo,picture:state.picture,user:state.user})

        case 'ADD_SUB_PROPERTIES':
            state.subProperties[action.payload[0]]=action.payload[1]
            return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,lastInfo:state.lastInfo,picture:state.picture,user:state.user})

        case 'ADD_PROPERTY_DESCRIPTION':
            state.description[action.payload[0]]=action.payload[1]
            return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,lastInfo:state.lastInfo,picture:state.picture,user:state.user})

        case 'ADD_ADDRESS':
            state.address[action.payload[0]]=action.payload[1]

            return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,lastInfo:state.lastInfo,picture:state.picture,user:state.user})

            case 'ADD_GUEST':
                state.guest[action.payload[0]]=action.payload[1]
                console.log("GUEST",state.guest)
                return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,lastInfo:state.lastInfo,picture:state.picture,user:state.user})

          case 'ADD_AMENITIES':
            state.amenities[action.payload[0]]=action.payload[1]
            return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,lastInfo:state.lastInfo,picture:state.picture,user:state.user})


            case 'ADD_PICTURE':
                state.picture[action.payload[0]]=action.payload[1]
                console.log("DB VE",state.picture)
                return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,lastInfo:state.lastInfo,picture:state.picture,user:state.user})

           
        
            case 'ADD_DB_VENDORPROP':
                state.vendorDBData[action.payload[0]]=action.payload[1]
               // console.log("DB VENDORPROP",state.vendorDBData)
               return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,lastInfo:state.lastInfo,picture:state.picture,user:state.user})

        case 'ADD_LASTINFO':
            state.lastInfo[action.payload[0]]=action.payload[1]
             // console.log("DB VENDORPROP",state.lastInfo)
              return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,lastInfo:state.lastInfo,picture:state.picture,user:state.user})

             
              case 'ADD_USER':
                state.user[action.payload[0]]=action.payload[1]
              //  console.log("DB VENDORPROP",state.user)
               return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,lastInfo:state.lastInfo,picture:state.picture,user:state.user})
              
              
               case "CLEAR_LOGIN":
                // state.user={}
                 state.vendor={}
               
                return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,lastInfo:state.lastInfo,picture:state.picture,user:state.user})
              
        default:
            return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,lastInfo:state.lastInfo,picture:state.picture,user:state.user})
 }
}