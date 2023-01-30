import { IPagination } from "../interface/pagination.interface"

const buildPagination = (dataLength: number, page:number, limit:number): IPagination=> {
    
    const pagesCount: number = Math.ceil(dataLength / limit)
    const nextPage: number = pagesCount < page + 1 ? null : page + 1
    const pagination: IPagination = {
        pages: pagesCount,
        current: page,
        next: nextPage,
        limit: limit
    }
    return pagination
}

export default buildPagination