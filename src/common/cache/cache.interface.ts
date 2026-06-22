export interface ICaheProvider {
  getData(key: string): Promise<string | null>;
  setData(key: string, value: string, ttl?: number): Promise<void>;
  deleteData(key: string): Promise<void>;

}
