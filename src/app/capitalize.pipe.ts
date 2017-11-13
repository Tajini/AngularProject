import {Injectable, Pipe, PipeTransform} from "@angular/core";

@Pipe({name: "capitalize"})
@Injectable()
export class CapitalizePipe implements PipeTransform {
    transform(value: string): string {

        return value
            .toLowerCase()
            .split("-")
            .map(p => p.charAt(0).toUpperCase() + p.substring(1))
            .join("-")
            .split(" ")
            .map(p => p.charAt(0).toUpperCase() + p.substring(1))
            .join(" ");

        // let first = value.charAt(0).toUpperCase();
        // let rest = value.substring(1).toLowerCase();
        // return first + rest;
    }
}
