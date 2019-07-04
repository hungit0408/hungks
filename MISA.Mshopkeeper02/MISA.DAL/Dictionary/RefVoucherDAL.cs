using MISA.Entities;
using MISA.Mshopkeeper02.Models.RequestData;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DAL.Dictionary
{
    /// <summary>
    /// Lớp thao tác với phiếu thu chi
    /// CreatedBy: NNLam(10/6/2019)
    /// </summary>
    public class RefVoucherDAL : Base<Ref>
    {
        /// <summary>
        /// Lấy danh sách phiếu Thu chi
        /// CreatedBy: NNLam(17/6/2019)
        /// </summary>
        /// <returns>Danh sách thông tin các phiếu thu chi</returns>
        public IEnumerable<Ref> GetListRefVoucher(FilterVoucherRequest filterVoucherRequest)
        {
            //SqlParameter PageNumber = new SqlParameter("@PageNumber", pageNumber);
            //SqlParameter NumberRow = new SqlParameter("@NumberRow", numberRow);
            //SqlParameter[] sqlParameters = { PageNumber, NumberRow };
            //return GetEntities("[dbo].[Proc_GetListVoucherRef]", sqlParameters);

            List<SqlParameter> sqlParameters = new List<SqlParameter>();
            PropertyInfo[] props = filterVoucherRequest.GetType().GetProperties();
            foreach (PropertyInfo prop in props)
            {
                var propName = prop.Name;
                var propValue = prop.GetValue(filterVoucherRequest);
                sqlParameters.Add(new SqlParameter("@" + propName, propValue ?? DBNull.Value));
            }
            return GetEntities("[dbo].[Proc_GetListVoucherRef]", sqlParameters.ToArray());

        }

        /// <summary>
        /// Lấy thông tin một phiếu thu chi
        /// CreatedBy: NNLam(18/6/2019)
        /// </summary>
        /// <param name="refID">ID phiếu cần lấy thông tin</param>
        /// <returns></returns>
        public Ref GetVoucherInfo(Guid refID)
        {
            SqlParameter sqlParameter = new SqlParameter("@RefID", refID);
            return GetEntity("[dbo].[Proc_GetRefVoucherInfo]", sqlParameter);
        }
        /// <summary>
        /// get data một phiếu thu chi
        /// CreatedBy: NNLam(18/6/2019)
        /// </summary>
        /// <param name="refID">ID phiếu cần lấy thông tin</param>
        /// <returns></returns>
        public Ref GetRefVoucherById(Guid refID)
        {
            SqlParameter sqlParameter = new SqlParameter("@RefID", refID);
            return GetEntity("[dbo].[Proc_GetRefVoucher]", sqlParameter);
        }
        
        /// <summary>
        /// Check xem có trùng code không
        /// CreatedBy: NNLam(22/6/2019)
        /// </summary>
        /// <param name="refNo">code phiếu cần lấy thông tin</param>
        /// <returns>true/ false</returns>
        public bool CheckDuplicateRefNo(string refNo)
        {
            SqlParameter sqlParameter = new SqlParameter("@RefNo", refNo);
            return CheckDuplicateCode("[dbo].[Proc_CheckDuplicateRefNo]", sqlParameter);
        }

        /// <summary>
        /// add ref 
        /// CreatedBy: NNLam(22/6/2019)
        /// </summary>
        /// <param name="refVoucher">ref entity</param>
        /// <returns>Guid</returns>
        public Guid InsertRefVoucher(Ref refVoucher)
        {
            return AddEntities("[dbo].[Proc_AddRefVoucher]", refVoucher);
        }

        /// <summary>
        /// edit ref entity
        /// CreatedBy: NNLam(22/6/2019)
        /// </summary>
        /// <param name="refVoucher">ref entity</param>
        /// <returns>Guid</returns>
        public int EditRefVoucher(Ref refVoucher)
        {
            SqlParameter RefID = new SqlParameter("@RefID", refVoucher.RefID);
            return EditEntity("[dbo].[Proc_EditRefVoucher]", RefID, refVoucher);
        }

        /// <summary>
        /// xóa ref, refDetail 
        /// CreatedBy: NNLam(22/6/2019)
        /// </summary>
        /// <param name="refVoucher">ref entity</param>
        /// <returns>Guid</returns>
        public int DeleteRefVoucher(Guid refID)
        {
            SqlParameter RefID = new SqlParameter("@RefID", refID);
           return DeleteEntity("[dbo].[Proc_DeleteRefVoucher]", RefID);
        }
        /// <summary>
        /// lọc danh sách theo khoảng thời gian
        /// CreatedBy: NNLam(17/6/2019)
        /// </summary>
        /// <returns>Danh sách thông tin các phiếu thu chi</returns>
        public IEnumerable<Ref> FilterVouchersByTime( int pageNumber, int numberRow, DateTime startDate, DateTime endDate)
        {
            SqlParameter PageNumber = new SqlParameter("@PageNumber", pageNumber);
            SqlParameter NumberRow = new SqlParameter("@NumberRow", numberRow);
            SqlParameter StartDate = new SqlParameter("@StartDate", startDate);
            SqlParameter EndDate = new SqlParameter("@EndDate", endDate);
            SqlParameter[] sqlParameters = { PageNumber, NumberRow, StartDate, EndDate };
            return GetEntities("[dbo].[Proc_FilterVoucherRefsByTime]", sqlParameters);
        }
    }
}
