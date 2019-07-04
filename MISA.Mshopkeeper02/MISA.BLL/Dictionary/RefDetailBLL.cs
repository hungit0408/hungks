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
    /// Lớp thao tác với bảng chi tiết phiếu ở tầng BLL
    /// CreatedBy: NDCong(15/6/2019)
    /// </summary>
    public class RefDetailBLL :IDisposable
    {
        private RefDetailDAL _refDetailDAL;

        /// <summary>
        /// Hàm khởi tạo
        /// CreatedBy: NDCong(15/6/2019)
        /// </summary>
        public RefDetailBLL()
        {
            _refDetailDAL = new RefDetailDAL();
        }

        /// <summary>
        /// Lấy thông tin chi tiết phiếu
        /// CreatedBy: NDCong(18/6/2019)
        /// </summary>
        /// <param name="refID">ID phiếu cần lấy chi tiết</param>
        /// <returns>Danh sách chi tiết phiếu</returns>
        public IEnumerable<RefDetail> GetRefDetails(Guid refID)
        {
            return _refDetailDAL.GetRefDetails(refID);
        }

        /// <summary>
        /// Xóa đối tượng khi không dùng đến
        /// CreatedBy: NDCong(15/6/2019)
        /// </summary>
        public void Dispose()
        {
            _refDetailDAL = null;
        }

        /// <summary>
        /// Thêm thông tin chi tiết phiếu nhập kho
        /// CreatedBy: NDCong(18/6/2019)
        /// </summary>
        /// <param name="refDetail">đối tượng chi tiết phiếu cần thêm</param>
        public Guid AddRefDetail(Guid refID, RefDetail refDetail)
        {
            refDetail.RefID = refID;
            return _refDetailDAL.AddRefDetail(refDetail);
        }

        /// <summary>
        /// Sửa chi tiết phiếu nhập kho
        /// CreatedBy: NDCong(25/6/2019)
        /// </summary>
        /// <param name="refDetailID"></param>
        /// <param name="refDetail"></param>
        /// <returns></returns>
        public int EditRefDetail(Guid refDetailID, RefDetail refDetail)
        {
            return _refDetailDAL.EditRefDetail(refDetailID, refDetail);
        }

        public int DeleteRefDetail(Guid refDetailID)
        {
            return _refDetailDAL.DeleteRefDetail(refDetailID);
        }
    }
}
