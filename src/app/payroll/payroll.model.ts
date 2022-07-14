export class payrollModel{
  static findIndex(arg0: (el: any) => boolean) {
    throw new Error('Method not implemented.');
  }
  id: number=0;
  employeeName: string='';
  date : string='';
  basic:number=0;
  houseRentAllowance:number=0;
  mealAllowance:number=0;
  status:number=1;
  monthpicker : string ='';
  yearpicker : string='';
  actualWorkingDay: any;
  leaveDay:any;
  netSalary:any;
}
