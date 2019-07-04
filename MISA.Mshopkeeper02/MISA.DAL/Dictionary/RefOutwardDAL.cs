using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.DAL;
using MISA.Entities;
using System.Data;
using System.Collections;
using System.Reflection;

namespace MISA.DAL
{
    public class RefOutwardDAL:Base<Ref>
    {
        /// <summary>
        /// Hàm lấy dữ liệu phiếu xuất kho từ DB
        /// </summary>
        /// <param name="pageNumber">Số trang hiện tại </param>
        /// <param name="numberRow">Số bản ghi trên 1 trang</param>
        /// <returns></returns>
        /// Created by: PMDUC 
        public IEnumerable<Ref> GetListRefOutward(RefCondition refCondition)
        {
            List<SqlParameter> sqlParameters = new List<SqlParameter>();
            PropertyInfo[] props = refCondition.GetType().GetProperties();
            foreach (PropertyInfo prop in props)
            {
                var propName = prop.Name;
                var propValue = prop.GetValue(refCondition);
                sqlParameters.Add(new SqlParameter("@" + propName, propValue ?? DBNull.Value));
            }
            return GetEntities("[dbo].[Proc_GetListOutwardRef]", sqlParameters.ToArray());
        }
        /// <summary>
        /// Hàm lấy dữ liệu một phiếu xuất kho
        /// </summary>
        /// <param name="refID">ID phiếu xuất kho</param>
        /// <returns></returns>
        public Ref GetRefOutward (Guid refID)
        {
            SqlParameter RefID = new SqlParameter("@RefID", refID);
            return GetEntity("[dbo].[Proc_GetRefInfor]", RefID);
        }
        /// <summary>
        /// Thêm phiếu xuất kho
        /// </summary>
        /// <param name="refOutward">Dữ liệu phiếu xuất kho</param>
        /// <returns></returns>
        /// Created by: PMDUC
        public Guid AddRefOutward(Ref refOutward)
        {
            return AddEntities("[dbo].[Proc_AddRefOutward]",refOutward);
        }
        /// <summary>
        /// Xóa Phiếu xuất kho
        /// </summary>
        /// <param name="refID">ID phiếu xuất kho</param>
        /// <returns></returns>
        public int DeleteRefOutward (Guid refID)
        {
            SqlParameter RefID = new SqlParameter("@refID", refID);
            return DeleteEntity("[dbo].[Proc_DeleteRefOutward]", RefID);
        }
        /// <summary>
        /// Tạo mới mã phiếu xuất kho
        /// </summary>
        /// <param name="prefix"></param>
        /// <param name="size"></param>
        /// <returns>Mã phiếu mới</returns>
        public string NewOutwardRefNo(string prefix)
        {
            SqlParameter Prefix = new SqlParameter("@Prefix", prefix);
                return GetNewCode("[dbo].[Proc_GetNewRefNo]", Prefix);
            
        } 
        /// <summary>
        /// Sửa phiếu xuất kho
        /// </summary>
        /// <param name="refID">ID phiếu xuất kho</param>
        /// <param name="refOutward">Thông tin phiếu xuất kho</param>
        /// <returns></returns>
        public int EditRefOutward(Guid refID, Ref refOutward)
        {
            SqlParameter RefID = new SqlParameter("@RefID", refID);
            return EditEntity("[dbo].[Proc_EditRefOutward]", RefID, refOutward);
        }
        
        /// <summary>
        /// Check trùng mã phiếu xuất kho
        /// </summary>
        /// <param name="refNo">Mã phiếu xuất kho</param>
        /// <returns></returns>
        public int CheckDuplicateCode (string refNo)
        {
            using (DatabaseAccess databaseAccess = new DatabaseAccess())
            {
                SqlCommand sqlCommand = databaseAccess.SqlCommand;
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.CommandText = "[dbo].[Proc_CheckDuplicateCode]";
                SqlParameter RefNo = new SqlParameter("@RefNo", refNo);
                sqlCommand.Parameters.Add(RefNo);
                return (int)sqlCommand.ExecuteScalar();
            }
        }
        

        
    }
}
