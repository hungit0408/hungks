using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Entities;

namespace MISA.DAL
{
    public class InventoryItemCategoryDAL : Base<InventoryItemCategory>
    {
        public IEnumerable<InventoryItemCategory> GetListInventoryItemCategory()
        {
            return GetEntities("[dbo].[Proc_GetListInventoryItemCategory]");
        }
    }
}
