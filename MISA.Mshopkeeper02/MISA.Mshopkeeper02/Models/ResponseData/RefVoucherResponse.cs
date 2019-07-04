using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MISA.Mshopkeeper02.Models.ResponseData
{
    public class RefVoucherResponse
    {
        public string Created { get; set; }
        public string ObjectName { get; set; }
        public string ObjectCode { get; set; }
        public string VoucherCode { get; set; }
        public Nullable<decimal> MoneyNumber { get; set; }
        public string Reason { get; set; }
        public bool Marked { get; set; }
        public string AddressOfObject { get; set; }
        public string VoucherType { get; set; }
        public string ActionPerson { get; set; }
        public string Item { get; set; }
        public string Id { get; set; }
        public List<Reckoning> reckonings { get; set; }
        public RefVoucherResponse() { }
        // contructor khởi tạo dữ liệu
        public RefVoucherResponse(Ref refvoucher, AccountObject accountObject)
        {
            this.Created = String.Format("{0:MM/dd/yyyy}", refvoucher.CreatedDate);
            this.ObjectName = accountObject.AccountObjectName;
            this.ObjectCode = accountObject.AccountObjectCode;
            this.VoucherCode = refvoucher.RefNo;
            this.MoneyNumber = refvoucher.TotalAmount;
            this.Reason = refvoucher.Description;
            this.Item = refvoucher.BudgetItemName;
            this.Id = refvoucher.RefID.ToString();
            this.Marked = refvoucher.Purpose;
            this.ActionPerson = refvoucher.ContactName;
            this.AddressOfObject = refvoucher.Address;
            switch (refvoucher.RefType)
            {
                case 14:
                    VoucherType = "Phiếu thu tiền mặt";
                    break;
                case 15:
                    VoucherType = "Phiếu thu nợ - tiền mặt";
                    break;
                case 16:
                    VoucherType = "Phiếu thu đặt cọc - tiền mặt";
                    break;
                case 17:
                    VoucherType = "Phiếu chi tiền mặt";
                    break;
                case 18:
                    VoucherType = "Phiếu trả nợ - tiền mặt";
                    break;
                case 19:
                    VoucherType = "Phiếu nhập hàng - tiền mặt";
                    break;
                case 20:
                    VoucherType = "Phiếu Trả lại hàng mua";
                    break;
                default:
                    VoucherType = "Thu cọc";
                    break;
            }
        }
    }
}