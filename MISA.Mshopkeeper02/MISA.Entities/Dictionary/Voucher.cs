using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entities.Dictionary
{
    // class conver to entity RefDetail
    public class Voucher
    {
        public string VoucherId { get; set; }
        public string InvoiceCode { get; set; }  // Invoice : là một tên khác của phiếu thanh toán
        public string ObjectCode { get; set; }
        public Nullable<decimal> Debit { get; set; }
        public Nullable<decimal> PaidNumber { get; set; }
        public Nullable<decimal> Pay { get; set; }
        public string Explain { get; set; }
        public Nullable<System.DateTime> Created { get; set; }
        public Nullable<System.DateTime> Updated { get; set; }

        public Voucher(RefDetail refDetail, string AccountObjectCode)
        {
            this.VoucherId = refDetail.RefID.ToString();
            this.InvoiceCode = refDetail.RefNo;
            this.ObjectCode = AccountObjectCode;
            this.Debit = refDetail.Amount; // tổng số tiền
            this.PaidNumber = refDetail.PaidNumber;// số đã thu/ trả
            this.Pay = refDetail.Pay; // số tiền hiện tại thu/ trả
            this.Created = refDetail.CreateRefDate;
        }
    }  
}
