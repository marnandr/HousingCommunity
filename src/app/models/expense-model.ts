import {ResidentModel} from "./resident-model";

export class ExpenseModel{
  id?: number
  amount?: number
  announced?: string
  resident: ResidentModel
  is_income?: boolean
  comment?: string;
  reason?: string
}
