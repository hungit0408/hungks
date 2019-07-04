using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entities
{
    /// <summary>
    /// Lớp thực thể hàng hóa
    /// CreatedBy: PMDuc(24/06/2019)
    /// </summary>
    public class InventoryItem
    {
        public Guid InventoryItemID { get; set; }

        public Guid ParentID { get; set; }

        public Guid InventoryItemCategoryID { get; set; }

        public List<InventoryItem> InventoryItemDetails { get; set; }

        public string SKUCode { get; set; }

        public string IventoryItemName { get; set; }

        public string ItemCategoryName { get; set; }

        public string UnitName { get; set; }

        public decimal UnitPrice { get; set; }

        public string StockName { get; set; }
    }
}
