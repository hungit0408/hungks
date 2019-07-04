using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entities
{
    /// <summary>
    /// Lớp thực thể của bảng chứng từ
    /// </summary>
    public class Ref
    {
        public Int64 RowIndex { get; set; }

        public Int64 TotalRow { get; set; }

        public Guid RefID { get; set; }

        public DateTime RefDate { get; set; }

        public string RefNo { get; set; }

        public Guid StoreID { get; set; }

        public string StoreName { get; set; }

        public decimal TotalAmount { get; set; }

        public string Description { get; set; }

        public Guid AccountObjectID { get; set; }

        public Guid EmployeeID { get; set; }

        public int ObjectType { get; set; }

        public string AccountObjectName { get; set; }

        public string AccountObjectCode { get; set; }

        public string VendorCode { get; set; }

        public string VendorName { get; set; }

        public string CustomerCode { get; set; }

        public string CustomerName { get; set; }

        public string EmployeeCode { get; set; }

        public string EmployeeName { get; set; }

        public string ContactName { get; set; }

        public bool Purpose { get; set; }

        public string Address { get; set; }

        public string BudgetItemName { get; set; }

        public DateTime CreatedDate { get; set; }

        public int RefType { get; set; }

        public string RefTypeName
        {
            get
            {
                switch (RefType)
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
                    case 6:
                        return "Phiếu nhập kho khác";
                    case 7:
                        return "Phiếu xuất kho bán hàng";
                    case 8:
                        return "Phiếu trả lại hàng mua - Tiền mặt";
                    case 9:
                        return "Phiếu trả lại hàng mua - Tiền gửi";
                    case 10:
                        return "Phiếu trả lại hàng mua - Giảm trừ công nợ";
                    case 11:
                        return "Phiếu xuất kho kiểm kê";
                    case 12:
                        return "Phiếu xuất kho điều chuyển sang cửa hàng khác";
                    case 13:
                        return "Phiếu xuất kho khác";
                    case 14:
                        return "Phiếu thu tiền mặt";
                    case 15:
                        return "Phiếu thu nợ - tiền mặt";
                    case 16:
                        return "Phiếu thu đặt cọc - tiền mặt";
                    case 17:
                        return "Phiếu chi tiền mặt";
                    case 18:
                        return "Phiếu trả nợ - tiền mặt";
                    case 19:
                        return "Phiếu nhập hàng - tiền mặt";
                    case 20:
                        return "Phiếu Trả lại hàng mua";
                    case 21:
                        return "Thu cọc";
                    default:
                        return "";
                }
            }
        }
        public List<RefDetail> RefDetails { get; set; }
    }
}
