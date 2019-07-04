
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entities
{
    /// <summary>
    /// Lớp thực thể bảng chi tiết chứng từ
    /// </summary>
    public class RefDetail
    {
        public Guid RefDetailID { get; set; }

        public Guid RefID { get; set; }

        public string RefNo { get; set; }

        public Guid InventoryItemID { get; set; }

        public string SKUCode { get; set; }

        public String IventoryItemName { get; set; }

        public Guid StockID { get; set; }

        public String StockName { get; set; }

        public int UnitID { get; set; }

        public string UnitName { get; set; }

        public int Quantity { get; set; }

        public decimal UnitPrice { get; set; }

        public string Description { get; set; }

        public decimal Amount { get; set; }

        public decimal Pay { get; set; }

        public decimal PaidNumber { get; set; }

        public Guid BudgetItemID { get; set; }

        public DateTime CreateRefDate { get; set; }
    }
}
