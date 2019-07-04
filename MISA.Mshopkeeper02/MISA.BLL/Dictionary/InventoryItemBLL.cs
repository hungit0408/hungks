using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.DAL;
using MISA.Entities;


namespace MISA.BLL
{
    /// <summary>
    /// Lớp thao tác dữ liệu với hàng hóa ở tâng BLL
    /// CreatedBy: NDCong(25/6/2019)
    /// </summary>
    public class InventoryItemBLL : IDisposable
    {
        InventoryItemDAL _inventoryItemDAL;

        /// <summary>
        /// Hàm khởi tạo
        /// CreatedBy: NDCong(25/6/2019)
        /// </summary>
        public InventoryItemBLL()
        {
            _inventoryItemDAL = new InventoryItemDAL();
        }

        /// <summary>
        /// Lấy tất cả hàng hóa có trong DB theo nhóm hàng hóa và từ khóa search
        /// CreatedBy: NDCong(25/6/2019)
        /// </summary>
        /// <param name="inventoryItemCategoryID">ID nhóm hàng hóa</param>
        /// <param name="filterSearch">từ khóa search</param>
        /// <returns></returns>
        public IEnumerable<InventoryItem> GetListIventoryItems(Guid? inventoryItemCategoryID, string filterSearch)
        {
            var listIventoryItems = _inventoryItemDAL.GetListInventoryItem(inventoryItemCategoryID, filterSearch);
            return listIventoryItems;

        }

        /// <summary>
        /// lấy thông tin chi tiết của một hàng hóa
        /// CreatedBy: NDCong(25/6/2019)
        /// </summary>
        /// <param name="inventoryItemID">ID hàng hóa</param>
        /// <returns></returns>
        public InventoryItem GetInventoryItem(Guid inventoryItemID)
        {
            return _inventoryItemDAL.GetInventoryItem(inventoryItemID);
        }

        

        /// <summary>
        /// Lấy tất cả các hàng hóa cụ thể
        /// CreatedBy: NDCong(26/6/2019)
        /// </summary>
        /// <param name="filterSearch"></param>
        /// <returns></returns>
        public IEnumerable<InventoryItem> GetListIventoryItems(string filterSearch)
        {
            return _inventoryItemDAL.GetListIventoryItems(filterSearch);
        }

        /// <summary>
        /// Hủy đối tượng khi không dùng
        /// CreatedBy: NDCong(25/6/2019)
        /// </summary>
        public void Dispose()
        {
            _inventoryItemDAL = null;
        }

    }
}
