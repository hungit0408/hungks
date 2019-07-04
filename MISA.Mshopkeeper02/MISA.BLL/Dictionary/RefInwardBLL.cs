using MISA.DAL;
using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.BLL
{
    /// <summary>
    /// Lớp thao tác dữ liệu với bảng phiếu nhập kho ở tầng BLL
    /// CreatedBy: NDCong(18/6/2019)
    /// </summary>
    public class RefInwardBLL : IDisposable
    {
        RefInwardDAL _refInwardDAL;
        /// <summary>
        /// Hàm khởi tạo
        /// CreatedBy: NDCong(18/6/2019)
        /// </summary>
        public RefInwardBLL()
        {
            _refInwardDAL = new RefInwardDAL();
        }

        /// <summary>
        /// Lấy thông tin các chứng từ theo phân trang
        /// CreatedBy: NDCong(18/6/2019)
        /// </summary>
        /// <param name="pageNumber">trang số bao nhiêu</param>
        /// <param name="numberRow">bao nhiêu dòng trên một trang</param>
        /// <returns></returns>
        public IEnumerable<Ref> GetListRefInward(RefCondition refCondition)
        {
            return _refInwardDAL.GetListRefInward(refCondition);
        }

        /// <summary>
        /// Lấy thông tin của một chứng từ
        /// CreatedBy: NDCong(18/6/2019)
        /// </summary>
        /// <param name="refID">ID chứng từ cần lấy thông tin</param>
        /// <returns></returns>
        public Ref GetRefInfor(Guid refID)
        {
            return _refInwardDAL.GetRefInfor(refID);
        }

        public object GetListRefFromOtherStore(Guid storeID, DateTime dateForm, DateTime dateTo)
        {
            return _refInwardDAL.GetListRefFromOtherStore(storeID, dateForm, dateTo);
        }

        /// <summary>
        /// Lấy số lượng chứng từ nhập kho có trong DB
        /// CreatedBy: NDCong(20/6/2019)
        /// </summary>
        /// <returns></returns>
        public int GetCountRefInward()
        {
            return _refInwardDAL.GetCountRefInward();
        }

        /// <summary>
        /// Lấy mã số phiếu tiếp theo
        /// CreatedBy: NDCong(20/6/2019)
        /// </summary>
        /// <returns>mã số phiếu tiếp theo</returns>
        public string GetNewRefNo()
        {
            return _refInwardDAL.GetNewRefNo();
        }

        /// <summary>
        /// Thêm chứng từ
        /// CreatedBy: NDCong(19/6/2019)
        /// </summary>
        /// <param name="newRef">Đối tượng chứng từ thêm</param>
        /// <returns></returns>
        public Guid AddRefInward(Ref newRef)
        {
            var newRefID = _refInwardDAL.AddRefInward(newRef);
            return newRefID;
        }

        /// <summary>
        /// Xóa chứng từ
        /// CreatedBy: NDCong(19/6/2019)
        /// </summary>
        /// <param name="refID"></param>
        /// <returns></returns>
        public int DeleteRef(Guid refID)
        {
            return _refInwardDAL.DeleteRefInward(refID);
        }

        /// <summary>
        /// Sửa chứng từ
        /// CreatedBy: NDCong(19/6/2019)
        /// </summary>
        /// <param name="refID">ID chứng từ cần sửa</param>
        /// <param name="editRef">Object chứng từ sửa</param>
        /// <returns></returns>
        public int EditRefInward(Guid refID, Ref editRef)
        {
            return _refInwardDAL.EditRefInward(refID, editRef);
        }

        //Loại bỏ đối tượng khi không dùng
        public void Dispose()
        {
            _refInwardDAL = null;
        }

        /// <summary>
        /// Kiểm tra xem số phiếu có bị trùng không
        /// CreatedBy: NDCong(22/6/2019)
        /// </summary>
        /// <param name="refNo">số phiếu cần kiểm tra</param>
        /// <returns></returns>
        public bool CheckDuplicateRefNo(string refNo)
        {
            var countDuplicate = _refInwardDAL.CheckDuplicateRefNo(refNo);
            if (countDuplicate > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
