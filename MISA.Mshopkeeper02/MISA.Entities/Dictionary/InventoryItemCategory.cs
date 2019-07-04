using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entities
{
    public class InventoryItemCategory
    {

        public Guid InventoryItemCategoryID { get; set; }

        public string ItemCategoryCode { get; set; }

        public string ItemCategoryName { get; set; }

        public string Description { get; set; }

        public List<InventoryItemCategory> inventoryItemCategories { get; set; }
    }
}
