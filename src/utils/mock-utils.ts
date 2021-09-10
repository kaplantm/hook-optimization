// Used for mocking async requests
export function sleep(ms = 1000): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
