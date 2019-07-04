using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DAL.Dictionary
{
    public class RefVoucherDetailDAL: Base<RefDetail>
    {

        /// <summary>
        /// add ref detail
        /// CreatedBy: NNLam(22/6/2019)
        /// </summary>
        /// <param name="refDetail">refDetail entity</param>
        public Guid InsertRefDetail(RefDetail refDetail)
        {
            return AddEntities("[dbo].[Proc_AddRefVoucherDetail]", refDetail);
        }

        /// <summary>
        /// Lấy danh sách bản ghi refDetail theo id của ref entity
        /// CreatedBy: NNLam(22/6/2019)
        /// </summary>
        /// <param name="refDetail">refDetail entity</param>
        public IEnumerable<RefDetail> GetRefVoucherDetailById(Guid refID)
        {
            SqlParameter sqlParameter = new SqlParameter("@RefID", refID);
            SqlParameter[] sqlParameters = { sqlParameter};
            return GetEntities("[dbo].[Proc_GetRefVoucherDetail]", sqlParameters);
        }

        /// <summary>
        /// edit ref detail
        /// CreatedBy: NNLam(22/6/2019)
        /// </summary>
        /// <param name="refDetail">refDetail entity</param>
        public int EditRefDetail(RefDetail refDetail)
        {
            SqlParameter sqlParameter = new SqlParameter("@RefID", refDetail.RefID);
            return EditEntity("[dbo].[Proc_EditRefVoucherDetail]", sqlParameter, refDetail);
        }
    }
}
