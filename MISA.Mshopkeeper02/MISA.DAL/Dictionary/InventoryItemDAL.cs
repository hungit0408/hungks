using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Entities;
using System.Data.SqlClient;

namespace MISA.DAL
{
    public class InventoryItemDAL : Base<InventoryItem>
    {
        /// <summary>
        /// Lấy thông tin các hàng hóa theo nhóm hàng hóa và từ khóa search
        /// CreatedBy: PMDuc(24/06/2019)
        /// ModifiledBy: NDCong(25/06/2019) Thêm filter và search
        /// </summary>
        /// <param name="inventoryItemCategoryID">ID nhóm hàng hóa</param>
        /// <param name="filterSearch">từ khóa search</param>
        /// <returns></returns>
        public IEnumerable<InventoryItem> GetListInventoryItem(Guid? inventoryItemCategoryID, string filterSearch)
        {
            SqlParameter[] sqlParameters = {
                new SqlParameter("@InventoryItemCategoryID", inventoryItemCategoryID),
                new SqlParameter("@FilterSearch", filterSearch)
            };

            var listInventoryItem = GetEntities("[dbo].[Proc_GetListInventoryItem]", sqlParameters);

            //Lấy thông tin các hàng hóa chi tiết của nó
            foreach (InventoryItem inventoryItem in listInventoryItem)
            {
                SqlParameter[] parentID = { new SqlParameter("@ParentID", inventoryItem.InventoryItemID) };

                var listInventoryItemDetail = GetEntities("[dbo].[Proc_GetListInventoryItemDetail]", parentID);

                inventoryItem.InventoryItemDetails = listInventoryItemDetail.ToList();
            }
            return listInventoryItem;
        }

        /// <summary>
        /// Lấy tất cả hàng hóa chi tiết có trong DB theo từ khóa search
        /// CreatedBy: NDCong(26/6/2019)
        /// </summary>
        /// <param name="filterSearch">từ khóa search</param>
        /// <returns></returns>
        public IEnumerable<InventoryItem> GetListIventoryItems(string filterSearch)
        {
            SqlParameter[] sqlParameters = { new SqlParameter("@FilterSearch", filterSearch) };
            var listItem = GetEntities("[dbo].[Proc_GetListInventoryItemSpecify]", sqlParameters);
            return listItem;
        }

        /// <summary>
        /// lấy thông tin của một hàng hóa trong DB
        /// CreatedBy: NDCong(25/06/2019)
        /// </summary>
        /// <param name="inventoryItemID">ID hàng hóa cần lấy thông tin</param>
        /// <returns></returns>
        public InventoryItem GetInventoryItem(Guid inventoryItemID)
        {
            SqlParameter InventoryItemID = new SqlParameter("@InventoryItemID", inventoryItemID);
            return GetEntity("[dbo].[Proc_GetInventoryItem]", InventoryItemID);
        }
    }
}
