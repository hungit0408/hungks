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
    /// Lớp thao tác dữ liệu với nhóm hàng hóa ở tầng BLL
    /// CreatedBy: NDCong(25/06/2019)
    /// </summary>
    public class InventoryItemCategoryBLL : IDisposable
    {
        InventoryItemCategoryDAL _inventoryItemCategoryDAL;

        public InventoryItemCategoryBLL()
        {
            this._inventoryItemCategoryDAL = new InventoryItemCategoryDAL();
        }

        /// <summary>
        /// Lấy thông tin các nhóm hàng hóa có trong DB
        /// </summary>
        /// <returns>danh sách nhóm hàng hóa</returns>
        public IEnumerable<InventoryItemCategory> GetListInventoryItemCategory()
        {
            return _inventoryItemCategoryDAL.GetListInventoryItemCategory();
        }

        //Thực hiện hủy đối tượng khi không dùng đến
        public void Dispose()
        {
            _inventoryItemCategoryDAL = null;
        }
    }
}
