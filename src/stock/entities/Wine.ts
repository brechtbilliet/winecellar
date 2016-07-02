export class Wine {
    _id: string;

    constructor(public name: string = "",
                public description: string = "",
                public region: string = "",
                public inStock: number = 0,
                public price: number = 0,
                public myRating: number = 0,
                public image: string = null) {
    }
}