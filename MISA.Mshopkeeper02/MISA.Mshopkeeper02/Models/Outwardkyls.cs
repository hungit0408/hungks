using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MISA.Mshopkeeper02.Models
{
    public class Outwardkyls
    {
        public string VoucherCode { get; set; }
        public DateTime DateOutward{ get; set; }
        public TimeSpan TimeOutward { get; set; }
        public decimal TotalMoney{ get; set; }
        public string Description { get; set; }
        public string ObjectCode { get; set; }
        public string ObjectName { get; set; }
        public int TypeVoucher { get;set;}
        public string Deliver { get; set; }
        public string Purpose { get; set; }
        public string TypeVoucherName
        {
            get
            {
                switch (TypeVoucher)
                {
                    case 0:
                        return "Phiếu nhập hàng - Tiền mặt";
                    case 1:
                        return "Phiếu nhập hàng - Tiền gửi";
                    case 2:
                        return "Phiếu nhập hàng - Ghi nợ";
                    case 3:
                        return "Phiếu nhập kho hàng trả lại";
                    case 4:
                        return "Phiếu nhập kho điều chuyển";
                    case 5:
                        return "Phiếu nhập kho kiểm kê";
                    default:
                        return "Phiếu nhập kho khác";
                }
            }            
            
        }

    }

    public class OutwardDetail
    {
        public Guid id { get; set; }
        public string SkuCode { get; set; }
        public string ProductName { get; set; }
        public string Stock { get; set; }
        public string Unit { get; set; }
        public decimal UnitPrice { get; set; }
        public int Quatity { get; set; }
        public int TotalQuatity { get; set; }
        public decimal Money { get; set; }
        public string VoucherCode { get; set; }
    }

    public class ObjectPerson
    {
        public string ObjectCode { get; set; }
        public string ObjectName { get; set; }
        public string ObjectType { get; set; }
        public string Addresss { get; set; }
    }

    public class SkuProduct
    {
        public string SkuCode { get; set; }
        public string ProductName { get; set; }
        public string ProductGroup { get; set; }
        public string Unit { get; set; }
        public int Quatity { get; set; }
        public decimal UnitPrice { get; set; }
        public string Stock { get; set; }
    }
}