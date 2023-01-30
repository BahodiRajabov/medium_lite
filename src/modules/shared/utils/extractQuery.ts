import { isEmpty } from "class-validator"
import { defaultQueryValues } from "../defaults/defaults"

const extractQuery = (query) => {
    const result = {}
    const defaultProps = Object.assign({}, defaultQueryValues)
    
    if (query && Object.keys(query).length) {
        for (const [key, value] of Object.entries(query)) {
            if (
                !isEmpty(value) &&
                key != "limit" && 
                key != "offset" && 
                key != "page" && 
                key != "order" && 
                key != "orderBy" &&
                key != "keyword" 
            ){
                result[key] = value
            }
            else{
                if (!isEmpty(value)) {
                    if (key == "page") {
                        let num: any = value
                        defaultProps.page = num - 1
                    }else{
                        defaultProps[key] = value
                    }
                }
            }
        }
    }
    defaultProps.offset = defaultProps.limit * defaultProps.page

    return {
        filters: result,
        sorts:  defaultProps
    }
}

export default extractQuery