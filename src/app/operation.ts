import {Compte} from "./compte";


export class Operation {
    public date : string; // ++Client.num;
    public libelle: string;
    public montant: number;
    public type: string;
    constructor(_date: string, _libelle: string, _montant: number, _type: string) {
        this.date = _date;
        this.libelle = _libelle;
        this.montant = _montant;
        this.type = _type;


 class Debit{
    public numbcompte: number;
    public idcompte: number;
    public numbdebit: number;
    public numfinal: number = 0;
    public deb(){
        this.numfinal = -this.numbcompte - -this.numbdebit;
        this.numbcompte = this.numfinal;        
        return this.numfinal;
    }
}

 class Credit{
    public numbcompte: number;
    public idcompte: number;
    public numbcredit: number;
    public numfinal: number = 0;
    public cred(){
        this.numfinal = +this.numbcompte + +this.numbcredit;
        this.numbcompte = this.numfinal;
        return this.numfinal;
    }
}
class Virement{
    public numbcomptedebit: number;
    public numbcomptecredit: number;
    public idcomptedebit: number;
    public idcomptecredit: number;
    public numbVirement: number;
    public vir(){
        this.numbcomptedebit = -this.numbcomptedebit - -this.numbVirement;
        this.numbcomptecredit = +this.numbcomptecredit + +this.numbVirement;
        return this.numbcomptecredit, this.numbcomptedebit;
    }
}
}}