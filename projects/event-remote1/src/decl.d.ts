declare module 'event_shell/Utils' {
  export function formatDate(date: Date): string;
}

declare module 'event_shell/DevInfo' {
  export function DeveloperInfo(): any;
}

declare module 'event_shell/APIService' {
  export class APIService {
    getData(): string;
    getDataWithOneParam(param1: string): string;
    getDataWithTwoParams(param1: string, param2: number): string;
  }
}