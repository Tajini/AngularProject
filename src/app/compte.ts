export class Compte {
    static num = 10;
    public id: number = ++Compte.num;
    public operations: Object[] = [];

    constructor(
        public numero: string,
        public intitule?: string
    ) { }
}
