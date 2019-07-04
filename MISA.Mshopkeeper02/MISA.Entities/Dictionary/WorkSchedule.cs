using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entities
{
    /// <summary>
    /// Lớp thực thể tượng trưng cho lịch biểu của nhân viên
    /// CreatedBy: PDXuan(26/06/2019)
    /// </summary>
    public class WorkSchedule
    {
        public Guid EmployeeID { get; set; }
        public string Monday { get; set; }
        public string Tuesday { get; set; }
        public string Wednesday { get; set; }
        public string Thursday { get; set; }
        public string Friday { get; set; }
        public string Saturday { get; set; }
        public string Sunday { get; set; }

        public WorkSchedule() {

        }

    }
}
