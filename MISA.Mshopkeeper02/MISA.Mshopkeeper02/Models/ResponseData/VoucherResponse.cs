using MISA.Entities;
using MISA.Entities.Dictionary;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Web;

namespace MISA.Mshopkeeper02.Models.ResponData
{
    public class VoucherResponse
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
        public List<Voucher> vouchers { get; set; }
        public VoucherResponse() { }
        // contructor khởi tạo dữ liệu
        public VoucherResponse(Ref voucher, AccountObject obj)
        {
            this.Created = String.Format("{0:MM/dd/yyyy}", voucher.CreatedDate);
            this.ObjectName = obj.AccountObjectName;
            this.ObjectCode = obj.AccountObjectCode;
            this.VoucherCode = voucher.RefNo;
            this.MoneyNumber = voucher.TotalAmount;
            this.Reason = voucher.Description;
            this.Item = voucher.BudgetItemName;
            this.Id = voucher.RefID.ToString();
            this.Marked = voucher.Purpose;
            this.ActionPerson = voucher.ContactName;
            this.AddressOfObject = voucher.Address;
            switch (voucher.RefType)
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
    //public enum Items
    //{
    //    [Description("Thu cọc")]
    //    Collect_Pile = 0,
    //    [Description("Thu khác")]
    //    Other_Revenue = 1,
    //    [Description("Thu thanh lý tài sản")]
    //    Asset_Liquidation = 2,
    //    [Description("Thu từ bán phế liệu")]
    //    Collect_From_Selling_Scrap = 3,
    //    [Description("Thu hoàn ứng")]
    //    Complete_Collection = 4

    //}
    //public enum VoucherTypes
    //{
    //    [Description("Tất cả")]
    //    All = 0,
    //    [Description("Phiếu thu tiền mặt")]
    //    Cash_Receipts = 1,
    //    [Description("Phiếu thu nợ - tiền mặt")]
    //    Debt_Collection_Slip_Cash = 2,
    //    [Description("Phiếu thu đặt cọc - tiền mặt")]
    //    Deposit_Slip_Cash = 3,
    //    [Description("Phiếu chi tiền mặt")]
    //    Cash_Vouchers = 4,
    //    [Description("Phiếu trả nợ - tiền mặt")]
    //    Repayment_Slip_Cash = 5,
    //    [Description("Phiếu nhập hàng - tiền mặt")]
    //    Import_Coupon_Cash = 6,
    //    [Description("Phiếu Trả lại hàng mua")]
    //    Returned_Purchases = 7
    //}
}