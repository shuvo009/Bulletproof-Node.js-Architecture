export class PagingRequest {
    public limit: number;
    public skip: number;

    constructor(pageNumber: number, perPage: number = 100) {
        this.skip = (pageNumber - 1) * perPage;
        this.limit = perPage;
    }
}
