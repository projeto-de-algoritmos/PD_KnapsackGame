import  Items  from "./Items";
import { publishFacade } from "@angular/compiler";

export default class Rooms{

    constructor(
        public nomeSala: string, 
        public items: Items[] = [],

    ){}
    
}