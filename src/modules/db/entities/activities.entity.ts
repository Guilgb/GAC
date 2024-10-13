export interface Activities {
  id: string;
  approval: boolean;
  file: string;
  workload: string;
  category: Array<string>;
  proof: string;
  startDate: Date;
  description: string;
  comments: Array<string>;
}
