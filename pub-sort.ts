export class ListEntry {
  title:string;
  year:string;
  month:string;
  day:string;

  constructor(title:string, year:string, month:string, day:string){
    this.title = title;
    this.year = year;
    this.month = month;
    this.day = day;
  }

  date(){
    return `${this.year}-${this.month}-${this.day}`
  }
}


/**Sort List entries by their dates in ascending order */
export function pubDateSort(list:ListEntry[]){
  let unsortedList:ListEntry[] = []

  // Loop over the entries and place them in the sorted list
  // for (const entry of list) {
  //   const title = entry["title"]
  //   const year = entry["year"]
  //   const month = entry["month"];
  //   const day = entry["day"];

  //   unsortedList.push(new ListEntry(title, year, month, day))
  // } 

  // Sort the list
  return list.sort((a,b) => isBiggerDate(a.date(), b.date()));
}
/**
 * Check if dateOne is later than dateTwo. 
 * @returns Returns 1 if the first argument is greater than the second, 0 if they're equal, and -1 otherwise. 
 */
function isBiggerDate(dateOne:string, dateTwo:string): number {
  // knowing JS this will do some weird bullshit like comparing the strings as booleans and not numbers so test
    if (dateOne > dateTwo){
      return 1;
    }
    else if (dateOne == dateTwo){
      return 0;
    }
    else {
      return -1;
    }
}

