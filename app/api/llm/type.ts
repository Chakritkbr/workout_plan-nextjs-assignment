// eventsource-parser.d.ts

declare module 'eventsource-parser' {
  export function createParser(onParse: (event: Event) => void): Parser;

  export interface Parser {
    feed(chunk: string): void;
  }

  export interface Event {
    id?: string;
    event?: string;
    data?: string;
    retry?: number;
  }
}
