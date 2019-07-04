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
    /// lớp thao tác với các đối tượng ở tầng DAL
    /// CreatedBy: NDCong(20/6/2019)
    /// </summary>
    public class ObjectDAL : Base<AccountObject>
    {
        public IEnumerable<AccountObject> GetListObject(int objectType, string objectFilter)
        {
            SqlParameter[] sqlParameters =
            {
                new SqlParameter ("@ObjectType", objectType),
                new SqlParameter ("@ObjectFilter", objectFilter)
            };

            return GetEntities("[dbo].[Proc_GetListObject]", sqlParameters);
        }

        public object GetObject(Guid objectID, int objectType)
        {
            SqlParameter AccountObjectID = new SqlParameter("@AccountObjectID", objectID);
            SqlParameter ObjectType = new SqlParameter("@ObjectType", objectType);
            SqlParameter[] sqlParameters = { AccountObjectID, ObjectType };
            return GetEntity("[dbo].[Proc_GetObject]", sqlParameters);
        }
    }
}
