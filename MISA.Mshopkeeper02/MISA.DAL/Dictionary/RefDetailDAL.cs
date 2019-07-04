using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace MISA.DAL
{
    /// <summary>
    /// Lớp thao tác dữ liệu với bảng chi tiết phiếu tầng DAL
    /// </summary>
    public class RefDetailDAL: Base<RefDetail>
    {
        /// <summary>
        /// Lấy thông tin chi tiết phiếu
        /// CreatedBy: NDCong(18/6/2019)
        /// </summary>
        /// <param name="refID">ID phiếu cần lấy chi tiết</param>
        /// <returns>Danh sách chi tiết phiếu</returns>
        public IEnumerable<RefDetail> GetRefDetails(Guid refID)
        {
            SqlParameter[] sqlParameters = { new SqlParameter("@RefID", refID) };
            return GetEntities("[dbo].[Proc_GetRefDetail]", sqlParameters);
        }

        public Guid AddRefDetail(RefDetail refDetail)
        {
            return AddEntities("[dbo].[Proc_AddRefDetail]", refDetail);
        }

        public int DeleteRefDetail(Guid refDetailID)
        {
            SqlParameter sqlParameter = new SqlParameter("@RefDetailID", refDetailID);
            return DeleteEntity("[dbo].[Proc_DeleteRefDetail]", sqlParameter);
        }

        public int EditRefDetail(Guid refDetailID, RefDetail refDetail)
        {
            SqlParameter RefDetailID = new SqlParameter("@RefDetailID", refDetail);
            return EditEntity("[dbo].[Proc_EditRefDetail]", RefDetailID, refDetail);
        }

        internal int DeleteAllRefDetailOfRef(Guid refID)
        {
            SqlParameter RefID = new SqlParameter("@RefID", refID);
            return DeleteEntity("[dbo].[Proc_DeleteAllRefDetailOfRef]", RefID);
        }
    }
}
