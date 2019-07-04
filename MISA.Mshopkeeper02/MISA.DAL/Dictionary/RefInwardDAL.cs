using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Entities;
using MISA.DAL;
using System.Data.SqlClient;
using System.Reflection;

namespace MISA.DAL
{
    /// <summary>
    /// Lớp thao tác với phiếu nhập kho
    /// CreatedBy: NDCong(10/6/2019)
    /// </summary>
    public class RefInwardDAL : Base<Ref>
    {
        /// <summary>
        /// Lấy danh sách phiếu nhập kho
        /// CreatedBy: NDCong(17/6/2019)
        /// </summary>
        /// <returns>Danh sách thông tin các phiếu nhập kho</returns>
        public IEnumerable<Ref> GetListRefInward(RefCondition refCondition)
        {
            List<SqlParameter> sqlParameters = new List<SqlParameter>();
            PropertyInfo[] props = refCondition.GetType().GetProperties();
            foreach (PropertyInfo prop in props)
            {
                var propName = prop.Name;
                var propValue = prop.GetValue(refCondition);
                sqlParameters.Add(new SqlParameter("@" + propName, propValue ?? DBNull.Value));
            }
            return GetEntities("[dbo].[Proc_GetListInwardRef]", sqlParameters.ToArray());
        }
        /// <summary>
        /// Lấy thông tin một phiếu nhập kho
        /// CreatedBy: NDCong(18/6/2019)
        /// </summary>
        /// <param name="refID">ID phiếu cần lấy thông tin</param>
        /// <returns></returns>
        public Ref GetRefInfor(Guid refID)
        {
            SqlParameter sqlParameter = new SqlParameter("@RefID", refID);
            return GetEntity("[dbo].[Proc_GetRefInfor]", sqlParameter);
        }

        /// <summary>
        /// Lấy các phiếu nhập kho từ cửa hàng khác
        /// CreatedBy: NDCong(22/6/2019)
        /// </summary>
        /// <param name="storeID">ID cửa hàng hiện tại</param>
        /// <param name="dateForm">ngày bắt đầu lọc</param>
        /// <param name="dateTo">ngày kết thúc lọc</param>
        /// <returns></returns>
        public object GetListRefFromOtherStore(Guid storeID, DateTime dateForm, DateTime dateTo)
        {
            SqlParameter[] sqlParameters =
            {
                new SqlParameter("@StoreID", storeID),
                new SqlParameter("@DateFrom", dateForm),
                new SqlParameter("@DateTo", dateTo)
            };
            return GetEntities("[dbo].[Proc_GetListInwardRefFromOtherStore]", sqlParameters);
        }

        /// <summary>
        /// Lấy số lượng phiếu nhập kho có trong DB
        /// </summary>
        /// <returns>Số lượng</returns>
        public int GetCountRefInward()
        {
            return GetCountEntity("[dbo].[Proc_GetTotalRecordRefInward]");
        }

        /// <summary>
        /// Lấy mã số phiếu tiếp theo
        /// </summary>
        /// <returns></returns>
        public string GetNewRefNo()
        {
            SqlParameter Prefix = new SqlParameter("@Prefix", "NK");
            return GetNewCode("[dbo].[Proc_GetNewRefNo]", Prefix);
        }

        /// <summary>
        /// Thêm phiếu nhập kho
        /// CreatedBy: NDCong(17/6/2019)
        /// </summary>
        /// <param name="inwardRef">Phiếu nhập kho</param>
        /// <returns>ID của phiếu nhập kho mới thêm</returns>
        public Guid AddRefInward(Ref inwardRef)
        {
            var newRefID = AddEntities("[dbo].[Proc_AddRefInward]", inwardRef);
            foreach (RefDetail refDetail in inwardRef.RefDetails)
            {
                SqlParameter[] sqlParameters =
                {
                    new SqlParameter ("@RefID", newRefID),
                    new SqlParameter ("@InventoryItemID", refDetail.InventoryItemID),
                    new SqlParameter ("@Quantity", refDetail.Quantity),
                    new SqlParameter ("@UnitPrice", refDetail.UnitPrice)
                };
                AddEntity("[dbo].[Proc_AddRefDetail]", sqlParameters);
            }
            return newRefID;
        }

        /// <summary>
        /// Kiểm tra xem số phiếu có bị trùng không
        /// CreatedBy: NDCong(22/6/2019)
        /// </summary>
        /// <param name="refNo">số phiếu cần kiểm tra</param>
        /// <returns></returns>
        public int CheckDuplicateRefNo(string refNo)
        {
            SqlParameter sqlParameter = new SqlParameter("@RefNo", refNo);
            return GetCountEntity("[dbo].[Proc_CheckDuplicateCode]", sqlParameter);
        }

        /// <summary>
        /// Xóa phiếu nhập kho
        /// CreatedBy: NDCong(18/6/2019)
        /// </summary>
        /// <param name="refID">ID phiếu cần xóa</param>
        /// <returns></returns>
        public int DeleteRefInward(Guid refID)
        {
            SqlParameter RefID = new SqlParameter("@RefID", refID);
            return DeleteEntity("[dbo].[Proc_DeleteRef]", RefID);
        }

        /// <summary>
        /// Chỉnh sửa phiếu nhập kho
        /// CreatedBy: NDCong(25/6/2019)
        /// </summary>
        /// <param name="refID">ID phiếu cần sửa</param>
        /// <param name="editRef">Đối tượng phiếu cần sửa (phải có cả danh sách chi tiết phiếu bên trong)</param>
        /// <returns></returns>
        public int EditRefInward(Guid refID, Ref editRef)
        {
            SqlParameter RefID = new SqlParameter("@RefID", refID);
            var result =  EditEntity("[dbo].[Proc_EditRefInward]", RefID, editRef);

            RefDetailDAL refDetailDAL = new RefDetailDAL();
            //Xóa các chi tiết phiếu cũ
            refDetailDAL.DeleteAllRefDetailOfRef(refID);

            //Thêm chi tiết phiếu mới
            foreach (RefDetail refDetail in editRef.RefDetails)
            {
                refDetailDAL.AddRefDetail(refDetail);
            }
            return result;
        }
    }
}
