export class Album {

   ref: string;
   name: string;
   title: string;
   description: string;
   duration: number;
   url?: string;
   like?: string;
   tags?: Array<string>;

}

export class List {
    ref: string;
    list: Array<string>;
}
