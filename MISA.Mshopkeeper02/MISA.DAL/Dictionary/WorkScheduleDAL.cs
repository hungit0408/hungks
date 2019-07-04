using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;


namespace MISA.DAL.Dictionary
{
    /// <summary>
    /// Lớp thao tác với dữ liệu vơi lịch làm việc của nhân viên 
    /// CreatedBy: PDXuan(26/06/2019)
    /// </summary>
    public class WorkScheduleDAL : Base<WorkSchedule>
    {
        /// <summary>
        /// Hàm lấy lịch làm việc của nhân viên theo Id của nhân viên
        /// CreatedBy: PDXuan926/06/2019)
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        public WorkSchedule GetWorkSchedule(Guid employeeId)
        {
            SqlParameter[] sqlParamater = { new SqlParameter("@EmployeeID", employeeId) };
            return GetEntity("[dbo].[Proc_GetAcessTimeByEmployeeID]", sqlParamater);
        }

        /// <summary>
        /// Hàm thêm lịch biểu của nhân viên 
        /// CreatedBY: PDXuan(27/06/2019)
        /// </summary>
        /// <param name="workSchedule"></param>
        /// <returns></returns>
        public Guid AddWorkSchedule(WorkSchedule workSchedule)
        {

            return AddEntities("[dbo].[Proc_AddEmployeeSchedule]", workSchedule);
        }

        /// <summary>
        /// Hàm Edit lịch biểu của nhân viên
        /// CreatedBy: PDXuan(27/06/2019)
        /// </summary>
        /// <param name="workSchedule"></param>
        public void EditWorkSchedule(WorkSchedule workSchedule)
        {
            AddEntity("[dbo].[Proc_EditWorkSchedule]", workSchedule);
        }
    }
}
