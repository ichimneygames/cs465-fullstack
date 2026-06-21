export interface Trip {
    _id: string,
    code: string,
    name: string,
    length: string,
    start: string | Date,
    resort: string,
    perPerson: string,
    image: string,
    description: string,
}