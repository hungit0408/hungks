using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.DAL.Dictionary;
using MISA.Entities;

namespace MISA.BLL.Dictionary
{
    /// <summary>
    /// Class xử lý logic của lịch biểu nhân viên
    /// CreatedBy: PDXuan(26/06/2019)
    /// </summary>
    public class WorkScheduleBLL : IDisposable
    {
        WorkScheduleDAL _workSchedule;

        /// <summary>
        /// Hàm khởi tạo 
        /// CreatedBy: PDXuan(26/06/2019)
        /// </summary>
        public WorkScheduleBLL()
        {
            _workSchedule = new WorkScheduleDAL();
        }
        /// <summary>
        /// Hàm lấy lịch biểu của nhân viên 
        /// CreatedBy: PDXuan(26/06/2019)
        /// </summary>
        /// <param name="employeeId">id nhân viên</param>
        /// <returns></returns>
        public WorkSchedule GetWorkSchedule(Guid employeeId)
        {
            return _workSchedule.GetWorkSchedule(employeeId);
        }

        /// <summary>
        /// Hàm thêm lịch biểu của nhân viên
        /// CreatedBy: PDXuan(27/06/2019)
        /// </summary>
        /// <param name="workSchedule"></param>
        /// <returns></returns>
        public Guid AddWorkSchedule (WorkSchedule workSchedule)
        {
            return _workSchedule.AddWorkSchedule(workSchedule);
        }

        /// <summary>
        /// Hàm edit lịch biểu của nhân viên
        /// CreatedBy:PDXuan(27/06/2019)
        /// </summary>
        /// <param name="workSchedule"></param>
        public void EditWorkSchedule (WorkSchedule workSchedule)
        {
            _workSchedule.EditWorkSchedule(workSchedule);
        }
        /// <summary>
        /// Hàm kế thừa từ interface
        /// </summary>
        public void Dispose()
        {
            _workSchedule = null;
        }
    }
}
