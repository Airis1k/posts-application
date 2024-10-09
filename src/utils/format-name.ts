export function useFormatFirstName(fullName: string): string {
   return fullName.split(" ").slice(0, 1)[0];
}
